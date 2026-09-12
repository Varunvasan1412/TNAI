<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Tnai\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponse;

class GalleryImageController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $status = $request->query('approval_status');
        
        $query = GalleryImage::with(['album', 'submittedBy', 'reviewedBy']);
        
        if ($status) {
            $query->where('approval_status', strtolower($status));
        }

        return $this->success($query->get(), 'Gallery Images retrieved successfully');
    }

    /**
     * Store a newly created resource in storage (Maker).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'album_id' => 'required|exists:albums,id',
            'image' => 'required|string', // Relaxed for testing initially
            'title' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
            'display_order' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();

        // Handle File Uploads (when moved to form-data)
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('albums/images', 'public');
        }

        $data['submitted_by'] = $request->user()?->id;
        $data['approval_status'] = 'draft';

        $galleryImage = GalleryImage::create($data);

        return $this->success($galleryImage, 'Gallery Image created as Draft successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $galleryImage = GalleryImage::with(['album', 'submittedBy', 'reviewedBy'])->find($id);
        if (!$galleryImage) return $this->error('Gallery Image not found', 404);

        return $this->success($galleryImage, 'Gallery Image retrieved successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $galleryImage = GalleryImage::find($id);
        if (!$galleryImage) return $this->error('Gallery Image not found', 404);

        $validator = Validator::make($request->all(), [
            'album_id' => 'sometimes|required|exists:albums,id',
            'image' => 'sometimes|required|string',
            'title' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
            'display_order' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('albums/images', 'public');
        }

        // Revert to draft upon update
        $data['approval_status'] = 'draft';
        $data['submitted_by'] = $request->user()?->id;

        $galleryImage->update($data);

        return $this->success($galleryImage, 'Gallery Image updated and reverted to Draft');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $galleryImage = GalleryImage::find($id);
        if (!$galleryImage) return $this->error('Gallery Image not found', 404);

        $galleryImage->delete();

        return $this->success(null, 'Gallery Image deleted successfully');
    }

    /**
     * Submit for Approval (Maker)
     */
    public function submitForApproval(Request $request, $id)
    {
        $galleryImage = GalleryImage::find($id);
        if (!$galleryImage) return $this->error('Gallery Image not found', 404);

        if (!in_array($galleryImage->approval_status, ['draft', 'rework'])) {
            return $this->error('Only drafts or reworked records can be submitted for approval.', 400);
        }

        $galleryImage->update([
            'approval_status' => 'pending',
            'submitted_date' => now(),
            'submitted_by' => $request->user()?->id ?? $galleryImage->submitted_by
        ]);

        return $this->success($galleryImage, 'Gallery Image submitted for approval successfully');
    }

    /**
     * Approve (Checker)
     */
    public function approve(Request $request, $id)
    {
        $galleryImage = GalleryImage::find($id);
        if (!$galleryImage) return $this->error('Gallery Image not found', 404);

        if ($galleryImage->approval_status !== 'pending') {
            return $this->error('Only pending records can be approved.', 400);
        }

        $galleryImage->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'published_date' => now(),
            'admin_remarks' => $request->admin_remarks
        ]);

        return $this->success($galleryImage, 'Gallery Image approved successfully');
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

        $galleryImage = GalleryImage::find($id);
        if (!$galleryImage) return $this->error('Gallery Image not found', 404);

        if ($galleryImage->approval_status !== 'pending') {
            return $this->error('Only pending records can be rejected or sent for rework.', 400);
        }

        $status = $request->type === 'rework' ? 'rework' : 'rejected';

        $galleryImage->update([
            'approval_status' => $status,
            'rejection_reason' => $request->rejection_reason,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now()
        ]);

        return $this->success($galleryImage, "Gallery Image marked as $status successfully");
    }
}
