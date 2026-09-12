<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Tnai\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponse;

class NewsletterController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $status = $request->query('approval_status');
        
        $query = Newsletter::with(['submittedBy', 'reviewedBy']);
        
        if ($status) {
            $query->where('approval_status', strtolower($status));
        }

        return $this->success($query->get(), 'Newsletters retrieved successfully');
    }

    /**
     * Store a newly created resource in storage (Maker).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'issue_volume' => 'required|string|max:255',
            'publication_date' => 'required|date',
            'cover_image' => 'required|string', // Relaxed for JSON testing
            'short_description' => 'nullable|string',
            'newsletter_pdf' => 'required|string', // Relaxed for JSON testing
            'external_url' => 'nullable|url',
            'display_order' => 'nullable|integer',
            'status' => 'required|in:active,inactive,Active,Inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();
        
        if (isset($data['status'])) {
            $data['status'] = strtolower($data['status']);
        }

        // Handle File Uploads (when switched to form-data)
        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('newsletters/covers', 'public');
        }
        if ($request->hasFile('newsletter_pdf')) {
            $data['newsletter_pdf'] = $request->file('newsletter_pdf')->store('newsletters/pdfs', 'public');
        }

        $data['submitted_by'] = $request->user()?->id;
        $data['approval_status'] = 'draft';

        $newsletter = Newsletter::create($data);

        return $this->success($newsletter, 'Newsletter created as Draft successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $newsletter = Newsletter::with(['submittedBy', 'reviewedBy'])->find($id);
        if (!$newsletter) return $this->error('Newsletter not found', 404);

        return $this->success($newsletter, 'Newsletter retrieved successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $newsletter = Newsletter::find($id);
        if (!$newsletter) return $this->error('Newsletter not found', 404);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'issue_volume' => 'sometimes|required|string|max:255',
            'publication_date' => 'sometimes|required|date',
            'cover_image' => 'sometimes|required|string', // Relaxed
            'short_description' => 'nullable|string',
            'newsletter_pdf' => 'sometimes|required|string', // Relaxed
            'external_url' => 'nullable|url',
            'display_order' => 'nullable|integer',
            'status' => 'sometimes|required|in:active,inactive,Active,Inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();
        
        if (isset($data['status'])) {
            $data['status'] = strtolower($data['status']);
        }

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('newsletters/covers', 'public');
        }
        if ($request->hasFile('newsletter_pdf')) {
            $data['newsletter_pdf'] = $request->file('newsletter_pdf')->store('newsletters/pdfs', 'public');
        }

        // Updating a record reverts it to draft
        $data['approval_status'] = 'draft';
        $data['submitted_by'] = $request->user()?->id;

        $newsletter->update($data);

        return $this->success($newsletter, 'Newsletter updated and reverted to Draft');
    }

    /**
     * Remove the specified resource from storage (Soft Delete).
     */
    public function destroy($id)
    {
        $newsletter = Newsletter::find($id);
        if (!$newsletter) return $this->error('Newsletter not found', 404);

        $newsletter->delete();

        return $this->success(null, 'Newsletter deleted successfully');
    }

    /**
     * Submit for Approval (Maker)
     */
    public function submitForApproval(Request $request, $id)
    {
        $newsletter = Newsletter::find($id);
        if (!$newsletter) return $this->error('Newsletter not found', 404);

        if (!in_array($newsletter->approval_status, ['draft', 'rework'])) {
            return $this->error('Only drafts or reworked records can be submitted for approval.', 400);
        }

        $newsletter->update([
            'approval_status' => 'pending',
            'submitted_date' => now(),
            'submitted_by' => $request->user()?->id ?? $newsletter->submitted_by
        ]);

        return $this->success($newsletter, 'Newsletter submitted for approval successfully');
    }

    /**
     * Approve (Checker)
     */
    public function approve(Request $request, $id)
    {
        $newsletter = Newsletter::find($id);
        if (!$newsletter) return $this->error('Newsletter not found', 404);

        if ($newsletter->approval_status !== 'pending') {
            return $this->error('Only pending records can be approved.', 400);
        }

        $newsletter->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'published_date' => now(),
            'admin_remarks' => $request->admin_remarks
        ]);

        return $this->success($newsletter, 'Newsletter approved successfully');
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

        $newsletter = Newsletter::find($id);
        if (!$newsletter) return $this->error('Newsletter not found', 404);

        if ($newsletter->approval_status !== 'pending') {
            return $this->error('Only pending records can be rejected or sent for rework.', 400);
        }

        $status = $request->type === 'rework' ? 'rework' : 'rejected';

        $newsletter->update([
            'approval_status' => $status,
            'rejection_reason' => $request->rejection_reason,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now()
        ]);

        return $this->success($newsletter, "Newsletter marked as $status successfully");
    }
}
