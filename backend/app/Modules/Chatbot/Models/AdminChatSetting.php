<?php

namespace App\Modules\Chatbot\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminChatSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'is_online'
    ];
}
