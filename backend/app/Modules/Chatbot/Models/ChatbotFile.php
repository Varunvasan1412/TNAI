<?php

namespace App\Modules\Chatbot\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChatbotFile extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'chat_message_id',
        'file_path'
    ];

    public function message()
    {
        return $this->belongsTo(ChatMessage::class, 'chat_message_id', 'id');
    }
}
