<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Tnai\Models\Concern;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponse;

class ConcernController extends Controller
{
    use ApiResponse;

    /**
     * Submit a new concern (Public / Member endpoint)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'member_name' => 'required|string|max:255',
            'tnai_membership_number' => 'required|string|max:255',
            'snai_membership_number' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'mobile_number' => 'required|string|max:20',
            'institution' => 'nullable|string|max:255',
            'branch_zone' => 'nullable|string|max:255',
            'concern_category' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
            'attachment' => 'required|string', // Relaxed to string for easy testing
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();

        if ($request->hasFile('attachment')) {
            $data['attachment'] = $request->file('attachment')->store('concerns', 'public');
        }

        $data['concern_status'] = 'pending';

        $concern = Concern::create($data);

        return $this->success($concern, 'Your concern has been submitted successfully.', 201);
    }

    /**
     * List all concerns (Admin)
     */
    public function index(Request $request)
    {
        $status = $request->query('concern_status');
        
        $query = Concern::with(['assignedTo']);
        
        if ($status) {
            $query->where('concern_status', strtolower($status));
        }

        return $this->success($query->get(), 'Concerns retrieved successfully');
    }

    /**
     * View a specific concern (Admin)
     */
    public function show($id)
    {
        $concern = Concern::with(['assignedTo'])->find($id);
        if (!$concern) return $this->error('Concern not found', 404);

        return $this->success($concern, 'Concern retrieved successfully');
    }

    /**
     * Resolve / Update Concern Status (Admin)
     */
    public function updateStatus(Request $request, $id)
    {
        $concern = Concern::find($id);
        if (!$concern) return $this->error('Concern not found', 404);

        $validator = Validator::make($request->all(), [
            'concern_status' => 'required|in:pending,in_progress,resolved,closed',
            'admin_response' => 'nullable|string',
            'internal_remarks' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = [
            'concern_status' => $request->concern_status,
            'assigned_to' => $request->user()?->id ?? $concern->assigned_to,
        ];

        if ($request->has('admin_response')) {
            $data['admin_response'] = $request->admin_response;
        }

        if ($request->has('internal_remarks')) {
            $data['internal_remarks'] = $request->internal_remarks;
        }

        if (in_array($request->concern_status, ['resolved', 'closed']) && !$concern->resolution_date) {
            $data['resolution_date'] = now();
        }

        $concern->update($data);

        return $this->success($concern, 'Concern status updated successfully');
    }

    /**
     * Soft Delete a concern (Admin)
     */
    public function destroy($id)
    {
        $concern = Concern::find($id);
        if (!$concern) return $this->error('Concern not found', 404);

        $concern->delete();

        return $this->success(null, 'Concern deleted successfully');
    }
}
