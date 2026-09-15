<?php

namespace App\Modules\Roles\Users\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponse;

class PasswordResetController extends Controller
{
    use ApiResponse;

    /**
     * Send OTP to the user's email for password reset
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            // We return success even if user not found to prevent email enumeration attacks
            return $this->success(null, 'If your email is registered, you will receive an OTP shortly.');
        }

        // Generate 6 digit OTP
        $otp = rand(100000, 999999);

        // Delete any existing OTPs for this email
        DB::table('password_reset_otps')->where('email', $user->email)->delete();

        // Save new OTP with 10 min expiration
        DB::table('password_reset_otps')->insert([
            'email' => $user->email,
            'otp' => Hash::make($otp),
            'created_at' => now(),
            'expires_at' => now()->addMinutes(10)
        ]);

        // Send Email
        Mail::raw("Your password reset OTP is: $otp. It is valid for 10 minutes.", function ($message) use ($user) {
            $message->to($user->email)
                    ->subject('Password Reset OTP');
        });

        return $this->success(null, 'If your email is registered, you will receive an OTP shortly.');
    }

    /**
     * Verify the OTP
     */
    public function verifyResetOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $resetRecord = DB::table('password_reset_otps')->where('email', $request->email)->first();

        if (!$resetRecord || !Hash::check($request->otp, $resetRecord->otp)) {
            return $this->error('Invalid OTP', 400);
        }

        if (now()->greaterThan($resetRecord->expires_at)) {
            return $this->error('OTP has expired', 400);
        }

        return $this->success(null, 'OTP verified successfully');
    }

    /**
     * Reset the password
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp' => 'required|string',
            'password' => 'required|string|min:8|confirmed'
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $resetRecord = DB::table('password_reset_otps')->where('email', $request->email)->first();

        if (!$resetRecord || !Hash::check($request->otp, $resetRecord->otp)) {
            return $this->error('Invalid OTP', 400);
        }

        if (now()->greaterThan($resetRecord->expires_at)) {
            return $this->error('OTP has expired', 400);
        }

        // OTP is valid. Find user and update password.
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return $this->error('User not found', 404);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        // Delete the OTP so it cannot be reused
        DB::table('password_reset_otps')->where('email', $request->email)->delete();

        return $this->success(null, 'Password reset successfully');
    }
}
