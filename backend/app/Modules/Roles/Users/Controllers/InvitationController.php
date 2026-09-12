<?php

namespace App\Modules\Roles\Users\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserInvitation;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Traits\ApiResponse;

class InvitationController extends Controller
{
    use ApiResponse;

    /**
     * Resend OTP from the user side
     */
    public function resendOtp(Request $request)
    {
        $request->validate([
            'token' => 'required|string'
        ]);

        $invitation = UserInvitation::where('token', $request->token)->first();

        if (!$invitation || $invitation->expires_at->isPast()) {
            return $this->error('Invalid or expired invitation token', 400);
        }

        $user = User::find($invitation->user_id);

        if (!$user) {
            return $this->error('User not found', 404);
        }

        // Generate new 6-digit OTP
        $otp = rand(100000, 999999);

        // Update database with new OTP and extend expiry by 2 mins
        $invitation->update([
            'otp' => $otp,
            'otp_expires_at' => now()->addMinutes(2)
        ]);

        // Send just the OTP Email
        Mail::to($user->email)->send(new \App\Mail\InvitationOtpMail($otp));

        return $this->success(null, 'A new OTP has been sent to your email. It is valid for 2 minutes.');
    }

    /**
     * Verify OTP, generate final password, and return it
     */
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'otp' => 'required|string'
        ]);

        $invitation = UserInvitation::where('token', $request->token)->first();

        if (!$invitation || $invitation->expires_at->isPast()) {
            return $this->error('Invalid or expired invitation token', 400);
        }

        if ($invitation->otp != $request->otp) {
            return $this->error('Invalid OTP', 400);
        }

        if ($invitation->otp_expires_at && $invitation->otp_expires_at->isPast()) {
            return $this->error('OTP has expired. Please request a new one.', 400);
        }

        $user = User::find($invitation->user_id);

        if (!$user) {
            return $this->error('User not found', 404);
        }

        // OTP is correct!
        
        // Mark the user's email as verified since they just proved they own it
        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        // Delete the invitation token and OTP so it can't be used again
        $invitation->delete();

        // Generate an auth token so the user can immediately set their own password
        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->success([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ], 'Identity verified successfully. Please use this token to set your password.');
    }
}
