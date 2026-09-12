<?php

namespace App\Modules\Chatbot\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChatSession extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'session_type',
        'status',
        'is_user_online',
        'log_status',
        'last_activity_at'
    ];

    public function messages()
    {
        return $this->hasMany(ChatMessage::class, 'chat_session_id', 'id');
    }
}
