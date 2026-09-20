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
        $query = OfficeBearer::with(['submittedBy', 'reviewedBy']);

        // TEMPORARILY DISABLED FOR TESTING WITHOUT AUTH
        // if (!$request->user()) {
        //     $query->where('approval_status', 'approved')->where('status', 'active');
        // } else {
            if ($request->has('status')) {
                $query->where('status', $request->status);
            } else {
                $query->where('status', 'active');
            }

            if ($request->has('approval_status')) {
                $query->where('approval_status', $request->approval_status);
            } else {
                $query->where('approval_status', '!=', 'draft');
            }
        // }

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
            'display_order' => 'nullable|integer',
            'status' => 'required|in:active,inactive,Active,Inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();
        $data['status'] = strtolower($data['status']);
        $data['approval_status'] = (isset($data['status']) && strtolower($data['status']) === 'active') ? 'pending' : 'draft';
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
        $data['approval_status'] = (isset($data['status']) && strtolower($data['status']) === 'active') ? 'pending' : 'draft';

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

        $validator = Validator::make($request->all(), [
            'rejection_reason' => 'required|string',
            ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $status = $request->input('approval_status', $request->input('type', 'rejected'));
        if ($status !== 'rework') $status = 'rejected';

        $bearer->update([
            'approval_status' => $status,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return $this->success($bearer, "Office Bearer marked as $status");
    }
}
