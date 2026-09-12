<?php

use Illuminate\Support\Facades\Route;

// Public Web Product Routes
Route::post('/enquiry', [\App\Modules\Product\Controllers\WebProductController::class, 'submitEnquiry']);
Route::get('/web/products', [\App\Modules\Product\Controllers\WebProductController::class, 'index']);
Route::get('/web/product/{id}', [\App\Modules\Product\Controllers\WebProductController::class, 'show']);

// Product Enquiry Routes
Route::get('/product_enquiry', [\App\Modules\Product\Controllers\ProductController::class, 'index_product_enquiry']);
Route::get('/product_enquiry/{id}', [\App\Modules\Product\Controllers\ProductController::class, 'show_product_enquiry']);
Route::put('/product_enquiry/{id}', [\App\Modules\Product\Controllers\ProductController::class, 'update_product_enquiry']);

// Category Routes
Route::post('/product_category', [\App\Modules\Product\Controllers\ProductController::class, 'store_category']);
Route::get('/product_category', [\App\Modules\Product\Controllers\ProductController::class, 'index_category']);
Route::get('/product_category/{id}', [\App\Modules\Product\Controllers\ProductController::class, 'show_category']);
Route::put('/product_category/{id}', [\App\Modules\Product\Controllers\ProductController::class, 'update_category']);
Route::delete('/product_category/{id}', [\App\Modules\Product\Controllers\ProductController::class, 'delete_category']);

// Subcategory Routes
Route::get('/product_subcategory', [\App\Modules\Product\Controllers\ProductController::class, 'index_subcategory']);
Route::post('/product_subcategory', [\App\Modules\Product\Controllers\ProductController::class, 'store_subcategory']);
Route::get('/product_subcategory/{id}', [\App\Modules\Product\Controllers\ProductController::class, 'show_subcategory']);
Route::put('/product_subcategory/{id}', [\App\Modules\Product\Controllers\ProductController::class, 'update_subcategory']);
Route::delete('/product_subcategory/{id}', [\App\Modules\Product\Controllers\ProductController::class, 'delete_subcategory']);

// Product Routes
Route::get('/product', [\App\Modules\Product\Controllers\ProductController::class, 'index_product']);
Route::post('/product', [\App\Modules\Product\Controllers\ProductController::class, 'store_product']);
Route::get('/product/image/delete/{id}', [\App\Modules\Product\Controllers\ProductController::class, 'delete_product_image']);
Route::get('/product/{id}', [\App\Modules\Product\Controllers\ProductController::class, 'show_product']);
Route::put('/product/{id}', [\App\Modules\Product\Controllers\ProductController::class, 'update_product']);
Route::delete('/product/{id}', [\App\Modules\Product\Controllers\ProductController::class, 'delete_product']);

// Temporary Route to clear cache on live server
Route::get('/clear-cache', function () {
    \Illuminate\Support\Facades\Artisan::call('route:clear');
    \Illuminate\Support\Facades\Artisan::call('config:clear');
    \Illuminate\Support\Facades\Artisan::call('cache:clear');
    return 'Cache cleared successfully!';
});
