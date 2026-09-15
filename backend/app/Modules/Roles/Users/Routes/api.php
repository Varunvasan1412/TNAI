<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Roles\Users\Controllers\AuthController;
use App\Modules\Roles\Users\Controllers\UserController;
use App\Modules\Roles\Users\Controllers\VerifyEmailController;

// Public routes
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1'); // Limit to 5 attempts per minute to prevent password hacking
Route::post('/register', [AuthController::class, 'register']);

Route::post('/invitations/resend-otp', [\App\Modules\Roles\Users\Controllers\InvitationController::class, 'resendOtp']);
Route::post('/invitations/verify-otp', [\App\Modules\Roles\Users\Controllers\InvitationController::class, 'verifyOtp']);

// Password Reset Routes
Route::post('/forgot-password', [\App\Modules\Roles\Users\Controllers\PasswordResetController::class, 'forgotPassword']);
Route::post('/verify-reset-otp', [\App\Modules\Roles\Users\Controllers\PasswordResetController::class, 'verifyResetOtp']);
Route::post('/reset-password', [\App\Modules\Roles\Users\Controllers\PasswordResetController::class, 'resetPassword']);

// Email Verification Route
Route::get('/email/verify/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Admin only routes
    Route::prefix('admin')->group(function () {
        Route::get('/pending-users', [UserController::class, 'getPendingUsers']);
        Route::post('/approve-user/{id}', [UserController::class, 'approveUser']);
        Route::post('/reject-user/{id}', [UserController::class, 'rejectUser']);
        Route::post('/create-user', [UserController::class, 'createUser']);
        Route::post('/resend-invitation/{id}', [UserController::class, 'resendInvitation']);
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{id}', [UserController::class, 'show']);
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);
    });
});
