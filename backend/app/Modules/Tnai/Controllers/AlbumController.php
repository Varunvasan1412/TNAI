<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Tnai\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponse;

class AlbumController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $status = $request->query('approval_status');
        
        $query = Album::with(['submittedBy', 'reviewedBy']);
        
        if ($status) {
            $query->where('approval_status', strtolower($status));
        }

        return $this->success($query->get(), 'Albums retrieved successfully');
    }

    /**
     * Store a newly created resource in storage (Maker).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string',
            'cover_image' => 'required|string', // Relaxed for testing initially
            'date' => 'nullable|date',
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

        // Handle File Uploads (when moved to form-data)
        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('albums/covers', 'public');
        }

        $data['submitted_by'] = $request->user()?->id;
        $data['approval_status'] = 'draft';

        $album = Album::create($data);

        return $this->success($album, 'Album created as Draft successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $album = Album::with(['submittedBy', 'reviewedBy'])->find($id);
        if (!$album) return $this->error('Album not found', 404);

        return $this->success($album, 'Album retrieved successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $album = Album::find($id);
        if (!$album) return $this->error('Album not found', 404);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string',
            'cover_image' => 'sometimes|required|string',
            'date' => 'nullable|date',
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
            $data['cover_image'] = $request->file('cover_image')->store('albums/covers', 'public');
        }

        // Revert to draft upon update
        $data['approval_status'] = 'draft';
        $data['submitted_by'] = $request->user()?->id;

        $album->update($data);

        return $this->success($album, 'Album updated and reverted to Draft');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $album = Album::find($id);
        if (!$album) return $this->error('Album not found', 404);

        $album->delete();

        return $this->success(null, 'Album deleted successfully');
    }

    /**
     * Submit for Approval (Maker)
     */
    public function submitForApproval(Request $request, $id)
    {
        $album = Album::find($id);
        if (!$album) return $this->error('Album not found', 404);

        if (!in_array($album->approval_status, ['draft', 'rework'])) {
            return $this->error('Only drafts or reworked records can be submitted for approval.', 400);
        }

        $album->update([
            'approval_status' => 'pending',
            'submitted_date' => now(),
            'submitted_by' => $request->user()?->id ?? $album->submitted_by
        ]);

        return $this->success($album, 'Album submitted for approval successfully');
    }

    /**
     * Approve (Checker)
     */
    public function approve(Request $request, $id)
    {
        $album = Album::find($id);
        if (!$album) return $this->error('Album not found', 404);

        if ($album->approval_status !== 'pending') {
            return $this->error('Only pending records can be approved.', 400);
        }

        $album->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'published_date' => now(),
            'admin_remarks' => $request->admin_remarks
        ]);

        return $this->success($album, 'Album approved successfully');
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

        $album = Album::find($id);
        if (!$album) return $this->error('Album not found', 404);

        if ($album->approval_status !== 'pending') {
            return $this->error('Only pending records can be rejected or sent for rework.', 400);
        }

        $status = $request->type === 'rework' ? 'rework' : 'rejected';

        $album->update([
            'approval_status' => $status,
            'rejection_reason' => $request->rejection_reason,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now()
        ]);

        return $this->success($album, "Album marked as $status successfully");
    }
}
