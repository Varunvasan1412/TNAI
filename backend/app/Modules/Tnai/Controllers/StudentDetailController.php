<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Tnai\Models\StudentDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponse;

class StudentDetailController extends Controller
{
    use ApiResponse;

    /**
     * List all Student Details
     */
    public function index(Request $request)
    {
        $status = $request->query('approval_status');
        
        $query = StudentDetail::with(['submittedBy', 'reviewedBy']);
        
        if ($status) {
            $query->where('approval_status', strtolower($status));
        }

        return $this->success($query->get(), 'Student Details retrieved successfully');
    }

    /**
     * Show a specific Student Detail
     */
    public function show($id)
    {
        $student = StudentDetail::with(['submittedBy', 'reviewedBy'])->find($id);
        if (!$student) return $this->error('Student Detail not found', 404);

        return $this->success($student, 'Student Detail retrieved successfully');
    }

    /**
     * Store a newly created Student Detail (Maker).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'student_name' => 'required|string|max:255',
            'student_id' => 'required|string|max:255',
            'admission_number' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|string|max:50',
            'course' => 'required|string|max:255',
            'course_year' => 'required|string|max:255',
            'academic_year' => 'required|string|max:255',
            'batch' => 'nullable|string|max:255',
            'student_photo' => 'nullable|string',
            'email' => 'required|email|max:255',
            'mobile_number' => 'required|string|max:255',
            'parent_guardian_name' => 'nullable|string|max:255',
            'parent_guardian_phone' => 'nullable|string|max:255',
            'parent_guardian_email' => 'nullable|email|max:255',
            'department' => 'nullable|string|max:255',
            'admission_year' => 'required|integer',
            'status' => 'required|in:active,inactive,Active,Inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();
        $data['status'] = strtolower($data['status']);
        $data['approval_status'] = 'draft';
        $data['submitted_by'] = $request->user()?->id;

        $student = StudentDetail::create($data);

        return $this->success($student, 'Student Detail created successfully as draft', 201);
    }

    /**
     * Update the specified Student Detail (Maker).
     */
    public function update(Request $request, $id)
    {
        $student = StudentDetail::find($id);
        if (!$student) return $this->error('Student Detail not found', 404);

        $validator = Validator::make($request->all(), [
            'student_name' => 'sometimes|required|string|max:255',
            'student_id' => 'sometimes|required|string|max:255',
            'admission_number' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'gender' => 'sometimes|required|string|max:50',
            'course' => 'sometimes|required|string|max:255',
            'course_year' => 'sometimes|required|string|max:255',
            'academic_year' => 'sometimes|required|string|max:255',
            'batch' => 'nullable|string|max:255',
            'student_photo' => 'nullable|string',
            'email' => 'sometimes|required|email|max:255',
            'mobile_number' => 'sometimes|required|string|max:255',
            'parent_guardian_name' => 'nullable|string|max:255',
            'parent_guardian_phone' => 'nullable|string|max:255',
            'parent_guardian_email' => 'nullable|email|max:255',
            'department' => 'nullable|string|max:255',
            'admission_year' => 'sometimes|required|integer',
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

        $student->update($data);

        return $this->success($student, 'Student Detail updated successfully and reverted to draft');
    }

    /**
     * Soft delete the specified Student Detail (Maker).
     */
    public function destroy($id)
    {
        $student = StudentDetail::find($id);
        if (!$student) return $this->error('Student Detail not found', 404);

        $student->delete();

        return $this->success(null, 'Student Detail deleted successfully');
    }

    /**
     * Submit for approval (Maker)
     */
    public function submitForApproval(Request $request, $id)
    {
        $student = StudentDetail::find($id);
        if (!$student) return $this->error('Student Detail not found', 404);

        if (!in_array($student->approval_status, ['draft', 'rework'])) {
            return $this->error('Only draft or rework records can be submitted', 400);
        }

        $student->update([
            'approval_status' => 'pending',
            'submitted_by' => $request->user()?->id,
            'submitted_date' => now(),
        ]);

        return $this->success($student, 'Student Detail submitted for approval');
    }

    /**
     * Approve the Student Detail (Checker)
     */
    public function approve(Request $request, $id)
    {
        $student = StudentDetail::find($id);
        if (!$student) return $this->error('Student Detail not found', 404);

        if ($student->approval_status !== 'pending') {
            return $this->error('Only pending records can be approved', 400);
        }

        $student->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'admin_remarks' => $request->admin_remarks,
            'published_date' => now(),
        ]);

        return $this->success($student, 'Student Detail approved successfully');
    }

    /**
     * Reject or send back for rework (Checker)
     */
    public function reject(Request $request, $id)
    {
        $student = StudentDetail::find($id);
        if (!$student) return $this->error('Student Detail not found', 404);

        if ($student->approval_status !== 'pending') {
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

        $student->update([
            'approval_status' => $status,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return $this->success($student, "Student Detail marked as $status");
    }
}
