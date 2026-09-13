<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Tnai\Models\TnaiUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponse;

class TnaiUnitController extends Controller
{
    use ApiResponse;

    /**
     * List all TNAI Units
     */
    public function index(Request $request)
    {
        $status = $request->query('approval_status');
        
        $query = TnaiUnit::with(['submittedBy', 'reviewedBy']);
        
        if ($status) {
            $query->where('approval_status', strtolower($status));
        }

        return $this->success($query->get(), 'TNAI Units retrieved successfully');
    }

    /**
     * Show a specific TNAI Unit
     */
    public function show($id)
    {
        $unit = TnaiUnit::with(['submittedBy', 'reviewedBy'])->find($id);
        if (!$unit) return $this->error('TNAI Unit not found', 404);

        return $this->success($unit, 'TNAI Unit retrieved successfully');
    }

    /**
     * Store a newly created TNAI Unit (Maker).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'unit_name' => 'required|string|max:255',
            'unit_code' => 'required|string|max:255',
            'branch_zone' => 'required|string|max:255',
            'unit_head_secretary' => 'required|string|max:255',
            'contact_person' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'address' => 'required|string',
            'district' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'number_of_members' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'status' => 'required|in:active,inactive,Active,Inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();
        $data['status'] = strtolower($data['status']);
        $data['approval_status'] = 'draft';
        $data['submitted_by'] = $request->user()?->id;

        $unit = TnaiUnit::create($data);

        return $this->success($unit, 'TNAI Unit created successfully as draft', 201);
    }

    /**
     * Update the specified TNAI Unit (Maker).
     */
    public function update(Request $request, $id)
    {
        $unit = TnaiUnit::find($id);
        if (!$unit) return $this->error('TNAI Unit not found', 404);

        $validator = Validator::make($request->all(), [
            'unit_name' => 'sometimes|required|string|max:255',
            'unit_code' => 'sometimes|required|string|max:255',
            'branch_zone' => 'sometimes|required|string|max:255',
            'unit_head_secretary' => 'sometimes|required|string|max:255',
            'contact_person' => 'sometimes|required|string|max:255',
            'phone' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            'address' => 'sometimes|required|string',
            'district' => 'sometimes|required|string|max:255',
            'state' => 'sometimes|required|string|max:255',
            'number_of_members' => 'sometimes|required|integer|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
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

        $unit->update($data);

        return $this->success($unit, 'TNAI Unit updated successfully and reverted to draft');
    }

    /**
     * Soft delete the specified TNAI Unit (Maker).
     */
    public function destroy($id)
    {
        $unit = TnaiUnit::find($id);
        if (!$unit) return $this->error('TNAI Unit not found', 404);

        $unit->delete();

        return $this->success(null, 'TNAI Unit deleted successfully');
    }

    /**
     * Submit for approval (Maker)
     */
    public function submitForApproval(Request $request, $id)
    {
        $unit = TnaiUnit::find($id);
        if (!$unit) return $this->error('TNAI Unit not found', 404);

        if (!in_array($unit->approval_status, ['draft', 'rework'])) {
            return $this->error('Only draft or rework records can be submitted', 400);
        }

        $unit->update([
            'approval_status' => 'pending',
            'submitted_by' => $request->user()?->id,
            'submitted_date' => now(),
        ]);

        return $this->success($unit, 'TNAI Unit submitted for approval');
    }

    /**
     * Approve the TNAI Unit (Checker)
     */
    public function approve(Request $request, $id)
    {
        $unit = TnaiUnit::find($id);
        if (!$unit) return $this->error('TNAI Unit not found', 404);

        if ($unit->approval_status !== 'pending') {
            return $this->error('Only pending records can be approved', 400);
        }

        $unit->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'admin_remarks' => $request->admin_remarks,
            'published_date' => now(),
        ]);

        return $this->success($unit, 'TNAI Unit approved successfully');
    }

    /**
     * Reject or send back for rework (Checker)
     */
    public function reject(Request $request, $id)
    {
        $unit = TnaiUnit::find($id);
        if (!$unit) return $this->error('TNAI Unit not found', 404);

        if ($unit->approval_status !== 'pending') {
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

        $unit->update([
            'approval_status' => $status,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return $this->success($unit, "TNAI Unit marked as $status");
    }
}
