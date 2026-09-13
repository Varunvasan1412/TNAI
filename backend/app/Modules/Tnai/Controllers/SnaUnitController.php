<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Tnai\Models\SnaUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponse;

class SnaUnitController extends Controller
{
    use ApiResponse;

    /**
     * List all SNA Units
     */
    public function index(Request $request)
    {
        $status = $request->query('approval_status');
        
        $query = SnaUnit::with(['submittedBy', 'reviewedBy']);
        
        if ($status) {
            $query->where('approval_status', strtolower($status));
        }

        return $this->success($query->get(), 'SNA Units retrieved successfully');
    }

    /**
     * Show a specific SNA Unit
     */
    public function show($id)
    {
        $snaUnit = SnaUnit::with(['submittedBy', 'reviewedBy'])->find($id);
        if (!$snaUnit) return $this->error('SNA Unit not found', 404);

        return $this->success($snaUnit, 'SNA Unit retrieved successfully');
    }

    /**
     * Store a newly created SNA Unit (Maker).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'unit_name' => 'required|string|max:255',
            'unit_code' => 'required|string|alpha_num|max:255',
            'institution' => 'required|string|max:255',
            'establishment_date' => 'required|date',
            'sna_advisor' => 'required|string|max:255',
            'contact_number' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'address' => 'required|string',
            'district' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'number_of_members' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'logo' => 'nullable|string',
            'renewal_date' => 'required|date',
            'fees_paid_on' => 'required|date',
            'status' => 'required|in:active,inactive,Active,Inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();
        $data['status'] = strtolower($data['status']);
        $data['approval_status'] = 'draft';
        $data['submitted_by'] = $request->user()?->id;

        $snaUnit = SnaUnit::create($data);

        return $this->success($snaUnit, 'SNA Unit created successfully as draft', 201);
    }

    /**
     * Update the specified SNA Unit (Maker).
     */
    public function update(Request $request, $id)
    {
        $snaUnit = SnaUnit::find($id);
        if (!$snaUnit) return $this->error('SNA Unit not found', 404);

        $validator = Validator::make($request->all(), [
            'unit_name' => 'sometimes|required|string|max:255',
            'unit_code' => 'sometimes|required|string|alpha_num|max:255',
            'institution' => 'sometimes|required|string|max:255',
            'establishment_date' => 'sometimes|required|date',
            'sna_advisor' => 'sometimes|required|string|max:255',
            'contact_number' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            'address' => 'sometimes|required|string',
            'district' => 'sometimes|required|string|max:255',
            'state' => 'sometimes|required|string|max:255',
            'number_of_members' => 'sometimes|required|integer|min:0',
            'description' => 'nullable|string',
            'logo' => 'nullable|string',
            'renewal_date' => 'sometimes|required|date',
            'fees_paid_on' => 'sometimes|required|date',
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

        $snaUnit->update($data);

        return $this->success($snaUnit, 'SNA Unit updated successfully and reverted to draft');
    }

    /**
     * Soft delete the specified SNA Unit (Maker).
     */
    public function destroy($id)
    {
        $snaUnit = SnaUnit::find($id);
        if (!$snaUnit) return $this->error('SNA Unit not found', 404);

        $snaUnit->delete();

        return $this->success(null, 'SNA Unit deleted successfully');
    }

    /**
     * Submit for approval (Maker)
     */
    public function submitForApproval(Request $request, $id)
    {
        $snaUnit = SnaUnit::find($id);
        if (!$snaUnit) return $this->error('SNA Unit not found', 404);

        if (!in_array($snaUnit->approval_status, ['draft', 'rework'])) {
            return $this->error('Only draft or rework records can be submitted', 400);
        }

        $snaUnit->update([
            'approval_status' => 'pending',
            'submitted_by' => $request->user()?->id,
            'submitted_date' => now(),
        ]);

        return $this->success($snaUnit, 'SNA Unit submitted for approval');
    }

    /**
     * Approve the SNA Unit and Generate Certificate (Checker)
     */
    public function approve(Request $request, $id)
    {
        $snaUnit = SnaUnit::find($id);
        if (!$snaUnit) return $this->error('SNA Unit not found', 404);

        if ($snaUnit->approval_status !== 'pending') {
            return $this->error('Only pending records can be approved', 400);
        }
        
        // Mocking certificate generation
        $mockedCertificatePath = env('APP_URL') . "/storage/certificates/sna_unit_" . $snaUnit->id . ".pdf";

        $snaUnit->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'admin_remarks' => $request->admin_remarks,
            'published_date' => now(),
            'certificate_path' => $mockedCertificatePath, // Generate certificate on approval
        ]);

        return $this->success($snaUnit, 'SNA Unit approved and certificate generated successfully');
    }

    /**
     * Reject or send back for rework (Checker)
     */
    public function reject(Request $request, $id)
    {
        $snaUnit = SnaUnit::find($id);
        if (!$snaUnit) return $this->error('SNA Unit not found', 404);

        if ($snaUnit->approval_status !== 'pending') {
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

        $snaUnit->update([
            'approval_status' => $status,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return $this->success($snaUnit, "SNA Unit marked as $status");
    }
}
