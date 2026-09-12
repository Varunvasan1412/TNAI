<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Roles\Super_admin\Controllers\SuperAdminAuthController;

Route::post('login', [SuperAdminAuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [SuperAdminAuthController::class, 'logout']);
    Route::get('/', function () {
        return response()->json(['message' => 'Welcome to Super_admin module']);
    });
});
