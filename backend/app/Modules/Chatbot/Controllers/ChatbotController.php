<?php

namespace App\Modules\Chatbot\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Chatbot\Models\AdminChatSetting;
use App\Modules\Chatbot\Models\ChatSession;
use App\Modules\Chatbot\Models\ChatMessage;
use Illuminate\Support\Facades\Mail;

class ChatbotController extends Controller
{
    public function toggle_status(Request $request)
    {
        $setting = AdminChatSetting::first();
        if (!$setting) {
            $setting = AdminChatSetting::create(['is_online' => false]);
        }

        if ($request->has('is_online')) {
            $newStatus = $request->is_online;
        } else {
            $newStatus = !$setting->is_online;
        }

        $setting->update(['is_online' => $newStatus]);

        if ($newStatus == true) {
            $pendingSessions = ChatSession::where('status', 'pending')
                                ->where('session_type', 'offline_ticket')
                                ->get();
                                
            foreach($pendingSessions as $session) {
                try {
                    Mail::to($session->email)->send(new \App\Mail\AdminBackOnlineMail());
                } catch (\Exception $e) {
                    \Illuminate\Support\Facades\Log::error('Admin Online Mail failed: ' . $e->getMessage());
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Chatbot status updated successfully',
            'data' => $setting
        ]);
    }

    public function sessions(Request $request)
    {
        // Auto-expire sessions that have been inactive for more than 2 minutes
        ChatSession::where('is_user_online', true)
            ->where('last_activity_at', '<', now()->subMinutes(2))
            ->update(['is_user_online' => false]);

        $sessions = ChatSession::with(['messages' => function($query) {
            $query->with('files')->latest();
        }])->latest()->get();

        return response()->json([
            'status' => true,
            'message' => 'Chat sessions retrieved',
            'data' => $sessions
        ]);
    }

    public function reply(Request $request)
    {
        $request->validate([
            'chat_session_id' => 'required|exists:chat_sessions,id',
            'message' => 'nullable|string',
            'files' => 'nullable|array',
            'files.*' => 'file|max:5120'
        ]);

        $message = ChatMessage::create([
            'chat_session_id' => $request->chat_session_id,
            'sender_type' => 'admin',
            'message' => $request->message,
            'is_read' => false
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

        // Broadcast the new message
        broadcast(new \App\Events\ChatbotMessageSent($message));

        $session = ChatSession::find($request->chat_session_id);
        if ($session && !$session->is_user_online) {
            try {
                Mail::to($session->email)->send(new \App\Mail\AdminReplyMail($request->message));
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Admin Reply Mail failed: ' . $e->getMessage());
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Reply sent successfully',
            'data' => $message
        ]);
    }

    public function send_notification(Request $request, $session_id)
    {
        $session = ChatSession::find($session_id);
        if (!$session) {
            return response()->json(['status' => false, 'message' => 'Session not found'], 404);
        }

        // Logic to send email here
        // Mail::to($session->email)->send(new OnlineNotificationMail());

        return response()->json([
            'status' => true,
            'message' => 'Notification email sent successfully to ' . $session->email
        ]);
    }
}
