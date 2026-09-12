<?php

namespace App\Modules\Chatbot\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChatMessage extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'chat_session_id',
        'sender_type',
        'message',
        'is_read',
        'log_status'
    ];

    public function session()
    {
        return $this->belongsTo(ChatSession::class, 'chat_session_id', 'id');
    }

    public function files()
    {
        return $this->hasMany(ChatbotFile::class, 'chat_message_id', 'id');
    }
}
