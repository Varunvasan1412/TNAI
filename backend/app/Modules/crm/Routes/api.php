<?php

use Illuminate\Support\Facades\Route;
use App\Modules\crm\Controllers\BlogController;
use App\Modules\crm\Controllers\EnquiryController;
use App\Modules\crm\Controllers\FollowupController;
use App\Modules\crm\Controllers\WebBlogController;

Route::get('/web/blog', [WebBlogController::class, 'index']);
Route::get('/web/blog/{id}', [WebBlogController::class, 'show']);
Route::get('/', function () {
    return response()->json(['message' => 'Welcome to CRM module']);
});

Route::get('/blog', [BlogController::class, 'index']);
Route::post('/blog', [BlogController::class, 'store']);
Route::get('/blog/{id}', [BlogController::class, 'show']);
Route::put('/blog/{id}', [BlogController::class, 'update']);
Route::delete('/blog/{id}', [BlogController::class, 'Delete']);
Route::delete('/blog/image/{id}', [BlogController::class, 'deleteImage']);
Route::post('/enquiry', [EnquiryController::class, 'submitEnquiry']);
Route::get('/enquiry', [EnquiryController::class, 'index']);
Route::put('/enquiry/{id}', [EnquiryController::class, 'update']);
Route::delete('/enquiry/{id}', [EnquiryController::class, 'delete']);
Route::post('/followup', [FollowupController::class, 'store']);
Route::put('/followup/{id}', [FollowupController::class, 'update']);
Route::delete('/followup/{id}', [FollowupController::class, 'delete']);
Route::put('/enquiry/convert/{id}', [EnquiryController::class, 'convertEnquiry']);