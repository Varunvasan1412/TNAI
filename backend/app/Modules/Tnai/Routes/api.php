<?php

use Illuminate\Support\Facades\Route;


// Temporary Route to clear cache on live server
Route::get('/clear-cache', function () {
    \Illuminate\Support\Facades\Artisan::call('route:clear');
    \Illuminate\Support\Facades\Artisan::call('config:clear');
    \Illuminate\Support\Facades\Artisan::call('cache:clear');
    return 'Cache cleared successfully!';
});

// TNAI Website Modules
use App\Modules\Tnai\Controllers\ExecutiveMemberController;
use App\Modules\Tnai\Controllers\EventController;

// --- PUBLIC ROUTES (No Auth Required) ---
// Only returns approved & active items
Route::get('/executive-members', [ExecutiveMemberController::class, 'index']);
Route::get('/executive-members/{id}', [ExecutiveMemberController::class, 'show']);

Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);

// Protected routes (Maker-Checker Workflow) - TEMPORARILY UNPROTECTED FOR TESTING
// Route::middleware(['auth:sanctum'])->group(function () {
    
    // 1. Executive Members
    Route::get('/admin/executive-members', [ExecutiveMemberController::class, 'index']);
    Route::get('/admin/executive-members/{id}', [ExecutiveMemberController::class, 'show']);
    Route::post('/admin/executive-members', [ExecutiveMemberController::class, 'store']);
    Route::put('/admin/executive-members/{id}', [ExecutiveMemberController::class, 'update']);
    Route::delete('/admin/executive-members/{id}', [ExecutiveMemberController::class, 'destroy']);
    Route::patch('/admin/executive-members/{id}/submit', [ExecutiveMemberController::class, 'submitForApproval']);
    Route::patch('/admin/executive-members/{id}/approve', [ExecutiveMemberController::class, 'approve']);
    Route::patch('/admin/executive-members/{id}/reject', [ExecutiveMemberController::class, 'reject']);

    // 2. Events
    Route::get('/admin/events', [EventController::class, 'index']);
    Route::get('/admin/events/{id}', [EventController::class, 'show']);
    Route::post('/admin/events', [EventController::class, 'store']);
    Route::put('/admin/events/{id}', [EventController::class, 'update']);
    Route::delete('/admin/events/{id}', [EventController::class, 'destroy']);
    Route::patch('/admin/events/{id}/submit', [EventController::class, 'submitForApproval']);
    Route::patch('/admin/events/{id}/approve', [EventController::class, 'approve']);
    Route::patch('/admin/events/{id}/reject', [EventController::class, 'reject']);

    // 3. Institutions
    Route::get('/admin/institutions', [\App\Modules\Tnai\Controllers\InstitutionController::class, 'index']);
    Route::get('/admin/institutions/{id}', [\App\Modules\Tnai\Controllers\InstitutionController::class, 'show']);
    Route::post('/admin/institutions', [\App\Modules\Tnai\Controllers\InstitutionController::class, 'store']);
    Route::post('/admin/institutions/bulk-upload', [\App\Modules\Tnai\Controllers\InstitutionController::class, 'bulkUpload']);
    Route::put('/admin/institutions/{id}', [\App\Modules\Tnai\Controllers\InstitutionController::class, 'update']);
    Route::delete('/admin/institutions/{id}', [\App\Modules\Tnai\Controllers\InstitutionController::class, 'destroy']);
    Route::patch('/admin/institutions/{id}/submit', [\App\Modules\Tnai\Controllers\InstitutionController::class, 'submitForApproval']);
    Route::patch('/admin/institutions/{id}/approve', [\App\Modules\Tnai\Controllers\InstitutionController::class, 'approve']);
    Route::patch('/admin/institutions/{id}/reject', [\App\Modules\Tnai\Controllers\InstitutionController::class, 'reject']);
    // 4. Newsletters    // 5. SNAI Articles
    Route::get('/admin/articles', [\App\Modules\Tnai\Controllers\ArticleController::class, 'index']);
    Route::get('/admin/articles/{id}', [\App\Modules\Tnai\Controllers\ArticleController::class, 'show']);
    Route::post('/admin/articles', [\App\Modules\Tnai\Controllers\ArticleController::class, 'store']);
    Route::put('/admin/articles/{id}', [\App\Modules\Tnai\Controllers\ArticleController::class, 'update']);
    Route::delete('/admin/articles/{id}', [\App\Modules\Tnai\Controllers\ArticleController::class, 'destroy']);
    Route::patch('/admin/articles/{id}/submit', [\App\Modules\Tnai\Controllers\ArticleController::class, 'submitForApproval']);
    Route::patch('/admin/articles/{id}/approve', [\App\Modules\Tnai\Controllers\ArticleController::class, 'approve']);
    Route::patch('/admin/articles/{id}/reject', [\App\Modules\Tnai\Controllers\ArticleController::class, 'reject']);
    // 6. Statistics / Counters
    Route::get('/admin/statistics', [\App\Modules\Tnai\Controllers\StatisticController::class, 'index']);
    Route::get('/admin/statistics/{id}', [\App\Modules\Tnai\Controllers\StatisticController::class, 'show']);
    Route::post('/admin/statistics', [\App\Modules\Tnai\Controllers\StatisticController::class, 'store']);
    Route::put('/admin/statistics/{id}', [\App\Modules\Tnai\Controllers\StatisticController::class, 'update']);
    Route::delete('/admin/statistics/{id}', [\App\Modules\Tnai\Controllers\StatisticController::class, 'destroy']);
    Route::patch('/admin/statistics/{id}/submit', [\App\Modules\Tnai\Controllers\StatisticController::class, 'submitForApproval']);
    Route::patch('/admin/statistics/{id}/approve', [\App\Modules\Tnai\Controllers\StatisticController::class, 'approve']);
    Route::patch('/admin/statistics/{id}/reject', [\App\Modules\Tnai\Controllers\StatisticController::class, 'reject']);

    Route::get('/admin/newsletters', [\App\Modules\Tnai\Controllers\NewsletterController::class, 'index']);    // 7. Photo Gallery - Albums
    Route::get('/admin/albums', [\App\Modules\Tnai\Controllers\AlbumController::class, 'index']);
    Route::get('/admin/albums/{id}', [\App\Modules\Tnai\Controllers\AlbumController::class, 'show']);
    Route::post('/admin/albums', [\App\Modules\Tnai\Controllers\AlbumController::class, 'store']);
    Route::put('/admin/albums/{id}', [\App\Modules\Tnai\Controllers\AlbumController::class, 'update']);
    Route::delete('/admin/albums/{id}', [\App\Modules\Tnai\Controllers\AlbumController::class, 'destroy']);
    Route::patch('/admin/albums/{id}/submit', [\App\Modules\Tnai\Controllers\AlbumController::class, 'submitForApproval']);
    Route::patch('/admin/albums/{id}/approve', [\App\Modules\Tnai\Controllers\AlbumController::class, 'approve']);
    Route::patch('/admin/albums/{id}/reject', [\App\Modules\Tnai\Controllers\AlbumController::class, 'reject']);
    // 8. Photo Gallery - Images
    Route::get('/admin/gallery-images', [\App\Modules\Tnai\Controllers\GalleryImageController::class, 'index']);
    Route::get('/admin/gallery-images/{id}', [\App\Modules\Tnai\Controllers\GalleryImageController::class, 'show']);
    Route::post('/admin/gallery-images', [\App\Modules\Tnai\Controllers\GalleryImageController::class, 'store']);
    Route::put('/admin/gallery-images/{id}', [\App\Modules\Tnai\Controllers\GalleryImageController::class, 'update']);
    Route::delete('/admin/gallery-images/{id}', [\App\Modules\Tnai\Controllers\GalleryImageController::class, 'destroy']);
    Route::patch('/admin/gallery-images/{id}/submit', [\App\Modules\Tnai\Controllers\GalleryImageController::class, 'submitForApproval']);
    Route::patch('/admin/gallery-images/{id}/approve', [\App\Modules\Tnai\Controllers\GalleryImageController::class, 'approve']);
    Route::patch('/admin/gallery-images/{id}/reject', [\App\Modules\Tnai\Controllers\GalleryImageController::class, 'reject']);

    Route::get('/admin/newsletters/{id}', [\App\Modules\Tnai\Controllers\NewsletterController::class, 'show']);
    Route::post('/admin/newsletters', [\App\Modules\Tnai\Controllers\NewsletterController::class, 'store']);
    Route::put('/admin/newsletters/{id}', [\App\Modules\Tnai\Controllers\NewsletterController::class, 'update']);
    Route::delete('/admin/newsletters/{id}', [\App\Modules\Tnai\Controllers\NewsletterController::class, 'destroy']);
    Route::patch('/admin/newsletters/{id}/submit', [\App\Modules\Tnai\Controllers\NewsletterController::class, 'submitForApproval']);
    Route::patch('/admin/newsletters/{id}/approve', [\App\Modules\Tnai\Controllers\NewsletterController::class, 'approve']);
    Route::patch('/admin/newsletters/{id}/reject', [\App\Modules\Tnai\Controllers\NewsletterController::class, 'reject']);

    // 4. Latest News & Circulars
    Route::get('/admin/news-circulars', [\App\Modules\Tnai\Controllers\NewsCircularController::class, 'index']);
    Route::get('/admin/news-circulars/{id}', [\App\Modules\Tnai\Controllers\NewsCircularController::class, 'show']);
    Route::post('/admin/news-circulars', [\App\Modules\Tnai\Controllers\NewsCircularController::class, 'store']);
    Route::put('/admin/news-circulars/{id}', [\App\Modules\Tnai\Controllers\NewsCircularController::class, 'update']);
    Route::delete('/admin/news-circulars/{id}', [\App\Modules\Tnai\Controllers\NewsCircularController::class, 'destroy']);
    Route::patch('/admin/news-circulars/{id}/submit', [\App\Modules\Tnai\Controllers\NewsCircularController::class, 'submitForApproval']);
    Route::patch('/admin/news-circulars/{id}/approve', [\App\Modules\Tnai\Controllers\NewsCircularController::class, 'approve']);
    Route::patch('/admin/news-circulars/{id}/reject', [\App\Modules\Tnai\Controllers\NewsCircularController::class, 'reject']);

// });
