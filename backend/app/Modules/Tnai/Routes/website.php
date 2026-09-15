<?php

use Illuminate\Support\Facades\Route;

// --- PUBLIC WEB ROUTES (No Auth Required) ---
// These APIs are exclusively for the Frontend Website.
// Base URL automatically applied: /api/tnai/web

Route::get('/events', [\App\Modules\Tnai\Controllers\Web\EventController::class, 'index']);
Route::get('/events/{id}', [\App\Modules\Tnai\Controllers\Web\EventController::class, 'show']);

Route::get('/newsletters', [\App\Modules\Tnai\Controllers\Web\NewsletterController::class, 'index']);
Route::get('/newsletters/{id}', [\App\Modules\Tnai\Controllers\Web\NewsletterController::class, 'show']);

Route::get('/articles', [\App\Modules\Tnai\Controllers\Web\ArticleController::class, 'index']);
Route::get('/articles/{id}', [\App\Modules\Tnai\Controllers\Web\ArticleController::class, 'show']);

Route::get('/statistics', [\App\Modules\Tnai\Controllers\Web\StatisticController::class, 'index']);
Route::get('/statistics/{id}', [\App\Modules\Tnai\Controllers\Web\StatisticController::class, 'show']);

Route::get('/albums', [\App\Modules\Tnai\Controllers\Web\AlbumController::class, 'index']);
Route::get('/albums/{id}', [\App\Modules\Tnai\Controllers\Web\AlbumController::class, 'show']);

Route::get('/gallery-images', [\App\Modules\Tnai\Controllers\Web\GalleryImageController::class, 'index']);
Route::get('/gallery-images/{id}', [\App\Modules\Tnai\Controllers\Web\GalleryImageController::class, 'show']);

Route::get('/downloads', [\App\Modules\Tnai\Controllers\Web\DownloadController::class, 'index']);
Route::get('/downloads/{id}', [\App\Modules\Tnai\Controllers\Web\DownloadController::class, 'show']);

Route::get('/activities', [\App\Modules\Tnai\Controllers\Web\ActivityController::class, 'index']);
Route::get('/activities/{id}', [\App\Modules\Tnai\Controllers\Web\ActivityController::class, 'show']);

Route::get('/sna-units', [\App\Modules\Tnai\Controllers\Web\SnaUnitController::class, 'index']);
Route::get('/sna-units/{id}', [\App\Modules\Tnai\Controllers\Web\SnaUnitController::class, 'show']);

Route::get('/tnai-units', [\App\Modules\Tnai\Controllers\Web\TnaiUnitController::class, 'index']);
Route::get('/tnai-units/{id}', [\App\Modules\Tnai\Controllers\Web\TnaiUnitController::class, 'show']);

Route::get('/impacts', [\App\Modules\Tnai\Controllers\Web\ImpactController::class, 'index']);
Route::get('/impacts/{id}', [\App\Modules\Tnai\Controllers\Web\ImpactController::class, 'show']);

Route::get('/office-bearers', [\App\Modules\Tnai\Controllers\Web\OfficeBearerController::class, 'index']);
Route::get('/office-bearers/{id}', [\App\Modules\Tnai\Controllers\Web\OfficeBearerController::class, 'show']);
