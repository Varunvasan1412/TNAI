<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Tnai\Models\Statistic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponse;

class StatisticController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $status = $request->query('approval_status');
        
        $query = Statistic::with(['submittedBy', 'reviewedBy']);
        
        if ($status) {
            $query->where('approval_status', strtolower($status));
        }

        return $this->success($query->get(), 'Statistics retrieved successfully');
    }

    /**
     * Store a newly created resource in storage (Maker).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'value' => 'required|integer',
            'description' => 'nullable|string',
            'icon' => 'nullable|string', // Relaxed for testing
            'display_order' => 'required|integer',
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
        if ($request->hasFile('icon')) {
            $data['icon'] = $request->file('icon')->store('statistics/icons', 'public');
        }

        $data['submitted_by'] = $request->user()?->id;
        $data['approval_status'] = 'draft';

        $statistic = Statistic::create($data);

        return $this->success($statistic, 'Statistic created as Draft successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $statistic = Statistic::with(['submittedBy', 'reviewedBy'])->find($id);
        if (!$statistic) return $this->error('Statistic not found', 404);

        return $this->success($statistic, 'Statistic retrieved successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $statistic = Statistic::find($id);
        if (!$statistic) return $this->error('Statistic not found', 404);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'value' => 'sometimes|required|integer',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
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

        if ($request->hasFile('icon')) {
            $data['icon'] = $request->file('icon')->store('statistics/icons', 'public');
        }

        // Revert to draft upon update
        $data['approval_status'] = 'draft';
        $data['submitted_by'] = $request->user()?->id;

        $statistic->update($data);

        return $this->success($statistic, 'Statistic updated and reverted to Draft');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $statistic = Statistic::find($id);
        if (!$statistic) return $this->error('Statistic not found', 404);

        $statistic->delete();

        return $this->success(null, 'Statistic deleted successfully');
    }

    /**
     * Submit for Approval (Maker)
     */
    public function submitForApproval(Request $request, $id)
    {
        $statistic = Statistic::find($id);
        if (!$statistic) return $this->error('Statistic not found', 404);

        if (!in_array($statistic->approval_status, ['draft', 'rework'])) {
            return $this->error('Only drafts or reworked records can be submitted for approval.', 400);
        }

        $statistic->update([
            'approval_status' => 'pending',
            'submitted_date' => now(),
            'submitted_by' => $request->user()?->id ?? $statistic->submitted_by
        ]);

        return $this->success($statistic, 'Statistic submitted for approval successfully');
    }

    /**
     * Approve (Checker)
     */
    public function approve(Request $request, $id)
    {
        $statistic = Statistic::find($id);
        if (!$statistic) return $this->error('Statistic not found', 404);

        if ($statistic->approval_status !== 'pending') {
            return $this->error('Only pending records can be approved.', 400);
        }

        $statistic->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'published_date' => now(),
            'admin_remarks' => $request->admin_remarks
        ]);

        return $this->success($statistic, 'Statistic approved successfully');
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

        $statistic = Statistic::find($id);
        if (!$statistic) return $this->error('Statistic not found', 404);

        if ($statistic->approval_status !== 'pending') {
            return $this->error('Only pending records can be rejected or sent for rework.', 400);
        }

        $status = $request->type === 'rework' ? 'rework' : 'rejected';

        $statistic->update([
            'approval_status' => $status,
            'rejection_reason' => $request->rejection_reason,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now()
        ]);

        return $this->success($statistic, "Statistic marked as $status successfully");
    }
}
