<?php

namespace App\Modules\Chatbot\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Chatbot\Models\AdminChatSetting;
use App\Modules\Chatbot\Models\ChatSession;
use App\Modules\Chatbot\Models\ChatMessage;
use Illuminate\Support\Facades\Mail;

class WebChatbotController extends Controller
{
    public function status()
    {
        $setting = AdminChatSetting::first();
        $is_online = $setting ? $setting->is_online : false;

        return response()->json([
            'status' => true,
            'is_online' => $is_online
        ]);
    }

    public function initiate(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'message' => 'nullable|string',
            'files' => 'nullable|array',
            'files.*' => 'file|max:5120'
        ]);

        $setting = AdminChatSetting::first();
        $is_online = $setting ? $setting->is_online : false;

        $session_type = $is_online ? 'online_chat' : 'offline_ticket';
        $session_status = $is_online ? 'active' : 'pending';

        // Check if user already has a session
        $session = ChatSession::where('email', $request->email)
            ->orWhere('phone', $request->phone)
            ->first();

        if ($session) {
            // Update the existing session status and type
            $session->update([
                'name' => $request->name,
                'session_type' => $session_type,
                'status' => $session_status,
                'last_activity_at' => now()
            ]);
        } else {
            // Create a new session
            $session = ChatSession::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'session_type' => $session_type,
                'status' => $session_status,
                'last_activity_at' => now()
            ]);
        }

        // Add the new message to the session
        $chatMessage = ChatMessage::create([
            'chat_session_id' => $session->id,
            'sender_type' => 'user',
            'message' => $request->message
        ]);

        // Handle multiple file uploads
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $filePath = $file->store('chat_files', 'public');
                \App\Modules\Chatbot\Models\ChatbotFile::create([
                    'chat_message_id' => $chatMessage->id,
                    'file_path' => $filePath
                ]);
            }
        }

        // Load entire history to return to the frontend
        $session->load('messages.files');

        // Broadcast the new message
        broadcast(new \App\Events\ChatbotMessageSent($chatMessage));

        // Send offline ticket confirmation mail
        if (!$is_online) {
            $autoMessage = \App\Modules\Chatbot\Models\ChatMessage::create([
                'chat_session_id' => $session->id,
                'sender_type' => 'admin',
                'message' => 'Admin is offline. Once the admin is online, they will contact you.'
            ]);

            try {
                Mail::to($session->email)->send(new \App\Mail\OfflineTicketReceivedMail($request->message));
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Offline Ticket Mail failed: ' . $e->getMessage());
            }

            broadcast(new \App\Events\ChatbotMessageSent($autoMessage));
            \App\Jobs\ProcessOfflineLogout::dispatch($session)->delay(now()->addSeconds(10));

            return response()->json([
                'status' => true,
                'is_admin_offline' => true,
                'message' => 'Admin is offline.',
                'data' => [
                    'session' => $session,
                    'new_message' => $chatMessage,
                    'auto_reply' => $autoMessage
                ]
            ], 201);
        }

        return response()->json([
            'status' => true,
            'message' => 'Chat initiated successfully',
            'data' => [
                'session' => $session,
                'new_message' => $chatMessage
            ]
        ], 201);
    }

    public function signin(Request $request)
    {
        $request->validate([
            'login' => 'required|email'
        ]);

        $session = ChatSession::where('email', $request->login)->first();

        if ($session) {
            $session->update([
                'last_activity_at' => now(),
                'is_user_online' => true
            ]);

            $welcomeMessage = \App\Modules\Chatbot\Models\ChatMessage::create([
                'chat_session_id' => $session->id,
                'sender_type' => 'admin',
                'message' => "👋 Welcome back, {$request->login}!  Welcome to RSI Store. How can we assist you today? 😊"


            ]);

            broadcast(new \App\Events\ChatbotMessageSent($welcomeMessage));

            $session->load('messages.files');

            return response()->json([
                'status' => true,
                'message' => 'Signed in successfully',
                'data' => [
                    'session' => $session
                ]
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Please sign up to start the chat'
        ], 404);
    }

    public function message(Request $request)
    {
        $request->validate([
            'chat_session_id' => 'required|exists:chat_sessions,id',
            'message' => 'nullable|string',
            'files' => 'nullable|array',
            'files.*' => 'file|max:5120'
        ]);

        $message = ChatMessage::create([
            'chat_session_id' => $request->chat_session_id,
            'sender_type' => 'user',
            'message' => $request->message
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $filePath = $file->store('chat_files', 'public');
                \App\Modules\Chatbot\Models\ChatbotFile::create([
                    'chat_message_id' => $message->id,
                    'file_path' => $filePath
                ]);
            }
        }

        $message->load('files');

        // Update session last activity
        $session = ChatSession::find($request->chat_session_id);
        
        $setting = AdminChatSetting::first();
        $is_online = $setting ? $setting->is_online : false;

        if ($session) {
            $session->update(['last_activity_at' => now(), 'is_user_online' => true]);

            if (!$is_online) {
                if ($session->session_type !== 'offline_ticket') {
                    $session->update([
                        'session_type' => 'offline_ticket',
                        'status' => 'pending'
                    ]);
                }

                try {
                    Mail::to($session->email)->send(new \App\Mail\OfflineTicketReceivedMail($request->message));
                } catch (\Exception $e) {
                    \Illuminate\Support\Facades\Log::error('Offline Ticket Mail failed: ' . $e->getMessage());
                }
                
                // Create an automated reply message
                $autoMessage = \App\Modules\Chatbot\Models\ChatMessage::create([
                    'chat_session_id' => $session->id,
                    'sender_type' => 'admin',
                    'message' => 'Admin is offline. Once the admin is online, they will contact you.'
                ]);

                broadcast(new \App\Events\ChatbotMessageSent($message));
                broadcast(new \App\Events\ChatbotMessageSent($autoMessage));

                // Dispatch the delayed backend logout job
                \App\Jobs\ProcessOfflineLogout::dispatch($session)->delay(now()->addSeconds(10));

                return response()->json([
                    'status' => true,
                    'is_admin_offline' => true,
                    'message' => 'Admin is offline.',
                    'data' => $message,
                    'auto_reply' => $autoMessage
                ]);
            }
        }

        // Broadcast the new message
        broadcast(new \App\Events\ChatbotMessageSent($message));

        return response()->json([
            'status' => true,
            'message' => 'Message sent successfully',
            'data' => $message
        ]);
    }

    public function presence(Request $request)
    {
        $request->validate([
            'chat_session_id' => 'required|exists:chat_sessions,id',
            'is_user_online' => 'required|boolean'
        ]);

        $session = ChatSession::find($request->chat_session_id);
        if ($session) {
            $session->is_user_online = $request->is_user_online;
            if ($request->is_user_online) {
                $session->last_activity_at = now();
            }
            $session->save();
        }

        return response()->json([
            'status' => true,
            'message' => 'Presence updated successfully'
        ]);
    }

    public function getMessages($session_id)
    {
        $session = ChatSession::with('messages.files')->find($session_id);

        if (!$session) {
            return response()->json([
                'status' => false,
                'message' => 'Chat session not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Messages retrieved successfully',
            'data' => $session->messages
        ]);
    }
}
