<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Company\Controllers\CompanyController;

Route::group([], function () {
    Route::get('/', [CompanyController::class, 'index']);
    Route::post('/', [CompanyController::class, 'store']); // Using POST because of file uploads
});
