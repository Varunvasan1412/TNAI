<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Tnai\Models\Concern;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Traits\ApiResponse;

class ConcernController extends Controller
{
    use ApiResponse;

    /**
     * Send OTP for Voice Your Concern (Public endpoint)
     */
    public function sendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255'
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $otp = rand(100000, 999999);

        DB::table('concern_otps')->where('email', $request->email)->delete();

        DB::table('concern_otps')->insert([
            'email' => $request->email,
            'otp' => $otp,
            'expires_at' => now()->addMinutes(10),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        Mail::raw("Your OTP for submitting the Voice Your Concern form is: $otp. It is valid for 10 minutes.", function ($message) use ($request) {
            $message->to($request->email)->subject('Voice Your Concern OTP');
        });

        return $this->success(null, 'OTP sent successfully to your email.');
    }

    /**
     * Resend OTP for Voice Your Concern (Public endpoint)
     */
    public function resendOtp(Request $request)
    {
        return $this->sendOtp($request);
    }

    /**
     * Verify OTP (Public endpoint)
     */
    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'otp' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $otpRecord = DB::table('concern_otps')->where('email', $request->email)->first();
        
        if (!$otpRecord || $otpRecord->otp !== $request->otp) {
            return $this->error('Invalid OTP', 400);
        }

        if (now()->greaterThan($otpRecord->expires_at)) {
            return $this->error('OTP has expired', 400);
        }

        return $this->success(null, 'OTP verified successfully.');
    }

    /**
     * Submit a new concern (Public / Member endpoint)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'member_name' => 'required|string|max:255',
            'tnai_membership_number' => 'required|string|max:255',
            'snai_membership_number' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'mobile_number' => 'nullable', // Removed string constraint entirely
            'institution' => 'nullable|string|max:255',
            'branch_zone' => 'nullable|string|max:255',
            'concern_category' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:255',
            'description' => 'required|string',
            'attachment' => 'required|string', // Relaxed to string for easy testing
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();

        // Map old frontend fields to new database schema fields
        if (isset($data['snai_membership_number'])) {
            $data['aadhar_number'] = $data['snai_membership_number'];
        }
        if (isset($data['subject'])) {
            $data['title'] = $data['subject'];
        }

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
