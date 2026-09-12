<?php

namespace App\Modules\Roles\Users\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class VerifyEmailController extends Controller
{
    use ApiResponse;

    /**
     * Mark the user's email address as verified.
     */
    public function __invoke(Request $request, $id, $hash)
    {
        $user = User::findOrFail($id);

        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return $this->error('Invalid verification link.', 403);
        }

        if ($user->hasVerifiedEmail()) {
            return $this->success(null, 'Email already verified.');
        }

        if ($user->markEmailAsVerified()) {
            // Update status to 'verified' after email verification
            if ($user->status === 'pending') {
                $user->status = 'verified';
                $user->save();
            }
        }

        return $this->success(null, 'Email verified successfully. Please wait for admin approval.');
    }
}
