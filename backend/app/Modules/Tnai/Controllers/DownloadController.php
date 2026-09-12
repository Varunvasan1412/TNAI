<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Tnai\Models\Download;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponse;

class DownloadController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $status = $request->query('approval_status');
        
        $query = Download::with(['submittedBy', 'reviewedBy']);
        
        if ($status) {
            $query->where('approval_status', strtolower($status));
        }

        return $this->success($query->get(), 'Downloads retrieved successfully');
    }

    /**
     * Store a newly created resource in storage (Maker).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'document_type' => 'required|string|max:255',
            'file_path' => 'required|string', // Relaxed to string for easy testing
            'publication_date' => 'required|date',
            'reference_number' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer',
            'status' => 'required|in:active,inactive', // Lowercase enforced
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();
        $data['status'] = strtolower($data['status']); // Ensure lowercase

        if ($request->hasFile('file_path')) {
            $data['file_path'] = $request->file('file_path')->store('downloads', 'public');
        }

        $data['submitted_by'] = $request->user()?->id;
        $data['approval_status'] = 'draft';

        $download = Download::create($data);

        return $this->success($download, 'Download created as Draft successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $download = Download::with(['submittedBy', 'reviewedBy'])->find($id);
        if (!$download) return $this->error('Download not found', 404);

        return $this->success($download, 'Download retrieved successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $download = Download::find($id);
        if (!$download) return $this->error('Download not found', 404);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'document_type' => 'sometimes|required|string|max:255',
            'file_path' => 'sometimes|required|string',
            'publication_date' => 'sometimes|required|date',
            'reference_number' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer',
            'status' => 'sometimes|required|in:active,inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();
        
        if (isset($data['status'])) {
            $data['status'] = strtolower($data['status']);
        }

        if ($request->hasFile('file_path')) {
            $data['file_path'] = $request->file('file_path')->store('downloads', 'public');
        }

        // Revert to draft upon update
        $data['approval_status'] = 'draft';
        $data['submitted_by'] = $request->user()?->id;

        $download->update($data);

        return $this->success($download, 'Download updated and reverted to Draft');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $download = Download::find($id);
        if (!$download) return $this->error('Download not found', 404);

        $download->delete();

        return $this->success(null, 'Download deleted successfully');
    }

    /**
     * Submit for Approval (Maker)
     */
    public function submitForApproval(Request $request, $id)
    {
        $download = Download::find($id);
        if (!$download) return $this->error('Download not found', 404);

        if (!in_array($download->approval_status, ['draft', 'rework'])) {
            return $this->error('Only drafts or reworked records can be submitted for approval.', 400);
        }

        $download->update([
            'approval_status' => 'pending',
            'submitted_date' => now(),
            'submitted_by' => $request->user()?->id ?? $download->submitted_by
        ]);

        return $this->success($download, 'Download submitted for approval successfully');
    }

    /**
     * Approve (Checker)
     */
    public function approve(Request $request, $id)
    {
        $download = Download::find($id);
        if (!$download) return $this->error('Download not found', 404);

        if ($download->approval_status !== 'pending') {
            return $this->error('Only pending records can be approved.', 400);
        }

        $download->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'published_date' => now(),
            'admin_remarks' => $request->admin_remarks
        ]);

        return $this->success($download, 'Download approved successfully');
    }

    /**
     * Reject or Rework (Checker)
     */
    public function reject(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'rejection_reason' => 'required|string',
            'type' => 'required|in:reject,rework'
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $download = Download::find($id);
        if (!$download) return $this->error('Download not found', 404);

        if ($download->approval_status !== 'pending') {
            return $this->error('Only pending records can be rejected or sent for rework.', 400);
        }

        $status = $request->type === 'rework' ? 'rework' : 'rejected';

        $download->update([
            'approval_status' => $status,
            'rejection_reason' => $request->rejection_reason,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now()
        ]);

        return $this->success($download, "Download marked as $status successfully");
    }
}
