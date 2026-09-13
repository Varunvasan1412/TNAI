<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Tnai\Models\Impact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponse;

class ImpactController extends Controller
{
    use ApiResponse;

    /**
     * List all Impacts
     */
    public function index(Request $request)
    {
        $status = $request->query('approval_status');
        
        $query = Impact::with(['submittedBy', 'reviewedBy']);
        
        if ($status) {
            $query->where('approval_status', strtolower($status));
        }

        return $this->success($query->get(), 'Impacts retrieved successfully');
    }

    /**
     * Show a specific Impact
     */
    public function show($id)
    {
        $impact = Impact::with(['submittedBy', 'reviewedBy'])->find($id);
        if (!$impact) return $this->error('Impact not found', 404);

        return $this->success($impact, 'Impact retrieved successfully');
    }

    /**
     * Store a newly created Impact (Maker).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'short_summary' => 'required|string',
            'detailed_description' => 'required|string',
            'category' => 'required|string|max:255',
            'impact_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'beneficiaries_count' => 'required|integer|min:0',
            'featured_image' => 'required|string',
            'supporting_images' => 'nullable|array',
            'supporting_images.*' => 'string',
            'supporting_document' => 'nullable|string',
            'external_url' => 'nullable|url',
            'display_order' => 'nullable|integer',
            'status' => 'required|in:active,inactive,Active,Inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();
        $data['status'] = strtolower($data['status']);
        $data['approval_status'] = 'draft';
        $data['submitted_by'] = $request->user()?->id;

        $impact = Impact::create($data);

        return $this->success($impact, 'Impact created successfully as draft', 201);
    }

    /**
     * Update the specified Impact (Maker).
     */
    public function update(Request $request, $id)
    {
        $impact = Impact::find($id);
        if (!$impact) return $this->error('Impact not found', 404);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'short_summary' => 'sometimes|required|string',
            'detailed_description' => 'sometimes|required|string',
            'category' => 'sometimes|required|string|max:255',
            'impact_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'beneficiaries_count' => 'sometimes|required|integer|min:0',
            'featured_image' => 'sometimes|required|string',
            'supporting_images' => 'nullable|array',
            'supporting_images.*' => 'string',
            'supporting_document' => 'nullable|string',
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

        // Revert to draft if updated
        $data['approval_status'] = 'draft';

        $impact->update($data);

        return $this->success($impact, 'Impact updated successfully and reverted to draft');
    }

    /**
     * Soft delete the specified Impact (Maker).
     */
    public function destroy($id)
    {
        $impact = Impact::find($id);
        if (!$impact) return $this->error('Impact not found', 404);

        $impact->delete();

        return $this->success(null, 'Impact deleted successfully');
    }

    /**
     * Submit for approval (Maker)
     */
    public function submitForApproval(Request $request, $id)
    {
        $impact = Impact::find($id);
        if (!$impact) return $this->error('Impact not found', 404);

        if (!in_array($impact->approval_status, ['draft', 'rework'])) {
            return $this->error('Only draft or rework records can be submitted', 400);
        }

        $impact->update([
            'approval_status' => 'pending',
            'submitted_by' => $request->user()?->id,
            'submitted_date' => now(),
        ]);

        return $this->success($impact, 'Impact submitted for approval');
    }

    /**
     * Approve the Impact (Checker)
     */
    public function approve(Request $request, $id)
    {
        $impact = Impact::find($id);
        if (!$impact) return $this->error('Impact not found', 404);

        if ($impact->approval_status !== 'pending') {
            return $this->error('Only pending records can be approved', 400);
        }

        $impact->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'admin_remarks' => $request->admin_remarks,
            'published_date' => now(),
        ]);

        return $this->success($impact, 'Impact approved successfully');
    }

    /**
     * Reject or send back for rework (Checker)
     */
    public function reject(Request $request, $id)
    {
        $impact = Impact::find($id);
        if (!$impact) return $this->error('Impact not found', 404);

        if ($impact->approval_status !== 'pending') {
            return $this->error('Only pending records can be rejected', 400);
        }

        $validator = Validator::make($request->all(), [
            'rejection_reason' => 'required|string',
            'type' => 'required|in:reject,rework'
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $status = $request->type === 'rework' ? 'rework' : 'rejected';

        $impact->update([
            'approval_status' => $status,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return $this->success($impact, "Impact marked as $status");
    }
}
