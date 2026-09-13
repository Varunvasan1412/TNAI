<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Tnai\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponse;

class ActivityController extends Controller
{
    use ApiResponse;

    /**
     * List all Activities
     */
    public function index(Request $request)
    {
        $status = $request->query('approval_status');
        
        $query = Activity::with(['submittedBy', 'reviewedBy']);
        
        if ($status) {
            $query->where('approval_status', strtolower($status));
        }

        return $this->success($query->get(), 'Activities retrieved successfully');
    }

    /**
     * Show a specific Activity
     */
    public function show($id)
    {
        $activity = Activity::with(['submittedBy', 'reviewedBy'])->find($id);
        if (!$activity) return $this->error('Activity not found', 404);

        return $this->success($activity, 'Activity retrieved successfully');
    }

    /**
     * Store a newly created Activity in storage (Maker).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'short_description' => 'required|string',
            'detailed_description' => 'required|string',
            'activity_date' => 'required|date',
            'location' => 'nullable|string|max:255',
            'featured_image' => 'required|string', // String for testing, usually file/image
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'string',
            'supporting_document' => 'nullable|string', // String for testing
            'display_order' => 'nullable|integer',
            'status' => 'required|in:active,inactive,Active,Inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();
        $data['status'] = strtolower($data['status']);
        
        // Handle logic for image uploads if switched to Multipart Form Data
        // ...

        $data['approval_status'] = 'draft';
        $data['submitted_by'] = $request->user()?->id;

        $activity = Activity::create($data);

        return $this->success($activity, 'Activity created successfully as draft', 201);
    }

    /**
     * Update the specified Activity in storage (Maker).
     */
    public function update(Request $request, $id)
    {
        $activity = Activity::find($id);
        if (!$activity) return $this->error('Activity not found', 404);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string|max:255',
            'short_description' => 'sometimes|required|string',
            'detailed_description' => 'sometimes|required|string',
            'activity_date' => 'sometimes|required|date',
            'location' => 'nullable|string|max:255',
            'featured_image' => 'sometimes|required|string',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'string',
            'supporting_document' => 'nullable|string',
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

        // Revert to draft if updated
        $data['approval_status'] = 'draft';

        $activity->update($data);

        return $this->success($activity, 'Activity updated successfully and reverted to draft');
    }

    /**
     * Soft delete the specified Activity (Maker).
     */
    public function destroy($id)
    {
        $activity = Activity::find($id);
        if (!$activity) return $this->error('Activity not found', 404);

        $activity->delete();

        return $this->success(null, 'Activity deleted successfully');
    }

    /**
     * Submit for approval (Maker)
     */
    public function submitForApproval(Request $request, $id)
    {
        $activity = Activity::find($id);
        if (!$activity) return $this->error('Activity not found', 404);

        if (!in_array($activity->approval_status, ['draft', 'rework'])) {
            return $this->error('Only draft or rework activities can be submitted', 400);
        }

        $activity->update([
            'approval_status' => 'pending',
            'submitted_by' => $request->user()?->id,
            'submitted_date' => now(),
        ]);

        return $this->success($activity, 'Activity submitted for approval');
    }

    /**
     * Approve the Activity (Checker)
     */
    public function approve(Request $request, $id)
    {
        $activity = Activity::find($id);
        if (!$activity) return $this->error('Activity not found', 404);

        if ($activity->approval_status !== 'pending') {
            return $this->error('Only pending activities can be approved', 400);
        }

        $activity->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'admin_remarks' => $request->admin_remarks,
            'published_date' => now(),
        ]);

        return $this->success($activity, 'Activity approved successfully');
    }

    /**
     * Reject or send back for rework (Checker)
     */
    public function reject(Request $request, $id)
    {
        $activity = Activity::find($id);
        if (!$activity) return $this->error('Activity not found', 404);

        if ($activity->approval_status !== 'pending') {
            return $this->error('Only pending activities can be rejected', 400);
        }

        $validator = Validator::make($request->all(), [
            'rejection_reason' => 'required|string',
            'type' => 'required|in:reject,rework'
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $status = $request->type === 'rework' ? 'rework' : 'rejected';

        $activity->update([
            'approval_status' => $status,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return $this->success($activity, "Activity marked as $status");
    }
}
