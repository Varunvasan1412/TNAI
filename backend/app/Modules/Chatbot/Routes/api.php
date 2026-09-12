<?php

use Illuminate\Support\Facades\Route;

// Web Chatbot Routes (Frontend)
Route::group(['prefix' => 'chat'], function() {
    Route::get('/status', [\App\Modules\Chatbot\Controllers\WebChatbotController::class, 'status']);
    Route::post('/initiate', [\App\Modules\Chatbot\Controllers\WebChatbotController::class, 'initiate']);
    Route::post('/chat-signin', [\App\Modules\Chatbot\Controllers\WebChatbotController::class, 'signin']);
    Route::post('/message', [\App\Modules\Chatbot\Controllers\WebChatbotController::class, 'message']);
    Route::post('/presence', [\App\Modules\Chatbot\Controllers\WebChatbotController::class, 'presence']);
    Route::get('/messages/{session_id}', [\App\Modules\Chatbot\Controllers\WebChatbotController::class, 'getMessages']);
});

// Admin Chatbot Routes
Route::group(['prefix' => 'admin/chat'], function() {
    Route::post('/toggle-status', [\App\Modules\Chatbot\Controllers\ChatbotController::class, 'toggle_status']);
    Route::get('/sessions', [\App\Modules\Chatbot\Controllers\ChatbotController::class, 'sessions']);
    Route::post('/reply', [\App\Modules\Chatbot\Controllers\ChatbotController::class, 'reply']);
    Route::post('/send-online-notification/{session_id}', [\App\Modules\Chatbot\Controllers\ChatbotController::class, 'send_notification']);
});