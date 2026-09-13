<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Tnai\Models\OfficeBearer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponse;

class OfficeBearerController extends Controller
{
    use ApiResponse;

    /**
     * List all Office Bearers
     */
    public function index(Request $request)
    {
        $status = $request->query('approval_status');
        
        $query = OfficeBearer::with(['submittedBy', 'reviewedBy']);
        
        if ($status) {
            $query->where('approval_status', strtolower($status));
        }

        return $this->success($query->get(), 'Office Bearers retrieved successfully');
    }

    /**
     * Show a specific Office Bearer
     */
    public function show($id)
    {
        $bearer = OfficeBearer::with(['submittedBy', 'reviewedBy'])->find($id);
        if (!$bearer) return $this->error('Office Bearer not found', 404);

        return $this->success($bearer, 'Office Bearer retrieved successfully');
    }

    /**
     * Store a newly created Office Bearer (Maker).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bearer_names' => 'required|array',
            'bearer_names.*' => 'string',
            'student_id' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'academic_year' => 'required|string|max:255',
            'course' => 'nullable|string|max:255',
            'year_of_study' => 'nullable|string|max:255',
            'photo' => 'required|string',
            'mobile_number' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'from_date' => 'nullable|date',
            'to_date' => 'nullable|date',
            'display_order' => 'required|integer',
            'status' => 'required|in:active,inactive,Active,Inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();
        $data['status'] = strtolower($data['status']);
        $data['approval_status'] = 'draft';
        $data['submitted_by'] = $request->user()?->id;

        $bearer = OfficeBearer::create($data);

        return $this->success($bearer, 'Office Bearer created successfully as draft', 201);
    }

    /**
     * Update the specified Office Bearer (Maker).
     */
    public function update(Request $request, $id)
    {
        $bearer = OfficeBearer::find($id);
        if (!$bearer) return $this->error('Office Bearer not found', 404);

        $validator = Validator::make($request->all(), [
            'bearer_names' => 'sometimes|required|array',
            'bearer_names.*' => 'string',
            'student_id' => 'sometimes|required|string|max:255',
            'designation' => 'sometimes|required|string|max:255',
            'academic_year' => 'sometimes|required|string|max:255',
            'course' => 'nullable|string|max:255',
            'year_of_study' => 'nullable|string|max:255',
            'photo' => 'sometimes|required|string',
            'mobile_number' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'from_date' => 'nullable|date',
            'to_date' => 'nullable|date',
            'display_order' => 'sometimes|required|integer',
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

        $bearer->update($data);

        return $this->success($bearer, 'Office Bearer updated successfully and reverted to draft');
    }

    /**
     * Soft delete the specified Office Bearer (Maker).
     */
    public function destroy($id)
    {
        $bearer = OfficeBearer::find($id);
        if (!$bearer) return $this->error('Office Bearer not found', 404);

        $bearer->delete();

        return $this->success(null, 'Office Bearer deleted successfully');
    }

    /**
     * Submit for approval (Maker)
     */
    public function submitForApproval(Request $request, $id)
    {
        $bearer = OfficeBearer::find($id);
        if (!$bearer) return $this->error('Office Bearer not found', 404);

        if (!in_array($bearer->approval_status, ['draft', 'rework'])) {
            return $this->error('Only draft or rework records can be submitted', 400);
        }

        $bearer->update([
            'approval_status' => 'pending',
            'submitted_by' => $request->user()?->id,
            'submitted_date' => now(),
        ]);

        return $this->success($bearer, 'Office Bearer submitted for approval');
    }

    /**
     * Approve the Office Bearer (Checker)
     */
    public function approve(Request $request, $id)
    {
        $bearer = OfficeBearer::find($id);
        if (!$bearer) return $this->error('Office Bearer not found', 404);

        if ($bearer->approval_status !== 'pending') {
            return $this->error('Only pending records can be approved', 400);
        }

        $bearer->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'admin_remarks' => $request->admin_remarks,
            'published_date' => now(),
        ]);

        return $this->success($bearer, 'Office Bearer approved successfully');
    }

    /**
     * Reject or send back for rework (Checker)
     */
    public function reject(Request $request, $id)
    {
        $bearer = OfficeBearer::find($id);
        if (!$bearer) return $this->error('Office Bearer not found', 404);

        if ($bearer->approval_status !== 'pending') {
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

        $bearer->update([
            'approval_status' => $status,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return $this->success($bearer, "Office Bearer marked as $status");
    }
}
