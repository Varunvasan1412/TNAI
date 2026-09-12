<?php

namespace App\Modules\Roles\Users\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use ApiResponse;

    /**
     * Get list of users waiting for approval
     */
    public function getPendingUsers()
    {
        $users = User::where('status', 'pending')
                    ->whereNotNull('email_verified_at')
                    ->get();

        return $this->success($users, 'Pending users retrieved successfully');
    }

    /**
     * Approve a user
     */
    public function approveUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->error('User not found', 404);
        }

        $user->status = 'active';
        $user->save();

        // You could send a notification email here: "Your account has been approved!"

        return $this->success($user, 'User approved successfully');
    }

    /**
     * Reject/Block a user
     */
    public function rejectUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->error('User not found', 404);
        }

        $user->status = 'rejected';
        $user->save();

        return $this->success($user, 'User rejected');
    }

    /**
     * Create a new user (Admin only)
     */
    public function createUser(\Illuminate\Http\Request $request)
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role' => 'required|in:college_user,member,admin',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        // Create the user with a dummy, unusable password initially
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => \Illuminate\Support\Facades\Hash::make(\Illuminate\Support\Str::random(32)),
            'role' => $request->role,
            'status' => 'active', // Automatically active since admin created them
        ]);

        // Generate invitation token and OTP
        $token = \Illuminate\Support\Str::random(60);
        $otp = rand(100000, 999999);

        \App\Models\UserInvitation::create([
            'user_id' => $user->id,
            'token' => $token,
            'otp' => $otp,
            'otp_expires_at' => now()->addMinutes(2),
            'expires_at' => now()->addHours(24),
        ]);

        // Send Welcome Email with Invitation Link
        \Illuminate\Support\Facades\Mail::to($user->email)->send(new \App\Mail\WelcomeNewUserMail($user, $token, $otp));

        return $this->success([
            'user' => $user
        ], 'User created and invitation email sent successfully', 201);
    }

    /**
     * Resend the invitation email to a user (Admin only)
     */
    public function resendInvitation($id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->error('User not found', 404);
        }

        // Delete any existing unused invitations
        \App\Models\UserInvitation::where('user_id', $user->id)->delete();

        // Generate new invitation token and OTP
        $token = \Illuminate\Support\Str::random(60);
        $otp = rand(100000, 999999);

        \App\Models\UserInvitation::create([
            'user_id' => $user->id,
            'token' => $token,
            'otp' => $otp,
            'otp_expires_at' => now()->addMinutes(2),
            'expires_at' => now()->addHours(24),
        ]);

        // Send Welcome Email with Invitation Link again
        \Illuminate\Support\Facades\Mail::to($user->email)->send(new \App\Mail\WelcomeNewUserMail($user, $token, $otp));

        return $this->success(null, 'Invitation email resent successfully');
    }
    /**
     * Get list of all users
     */
    public function index(Request $request)
    {
        $users = User::all();
        return $this->success($users, 'Users retrieved successfully');
    }

    /**
     * Get a specific user (for editing)
     */
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->error('User not found', 404);
        }

        return $this->success($user, 'User retrieved successfully');
    }

    /**
     * Update an existing user
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->error('User not found', 404);
        }

        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'sometimes|in:college_user,member,admin',
            'status' => 'sometimes|in:pending,active,rejected',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $oldEmail = $user->email;
        $user->update($request->only(['name', 'email', 'role', 'status']));

        // If email was changed, send a fresh setup email to the new address
        if ($request->has('email') && $request->email !== $oldEmail) {
            // Delete old unused tokens
            \App\Models\UserInvitation::where('user_id', $user->id)->delete();

            // Generate new invitation token and OTP
            $token = \Illuminate\Support\Str::random(60);
            $otp = rand(100000, 999999);

            \App\Models\UserInvitation::create([
                'user_id' => $user->id,
                'token' => $token,
                'otp' => $otp,
                'otp_expires_at' => now()->addMinutes(2),
                'expires_at' => now()->addHours(24),
            ]);

            // Send Welcome Email with Invitation Link to new email
            \Illuminate\Support\Facades\Mail::to($user->email)->send(new \App\Mail\WelcomeNewUserMail($user, $token, $otp));

            return $this->success($user, 'User updated successfully and setup email sent to new address');
        }

        return $this->success($user, 'User updated successfully');
    }

    /**
     * Delete a user
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->error('User not found', 404);
        }

        $user->delete();

        return $this->success(null, 'User deleted successfully');
    }
}
