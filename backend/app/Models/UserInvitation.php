<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserInvitation extends Model
{
    protected $fillable = [
        'user_id',
        'token',
        'otp',
        'otp_expires_at',
        'expires_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'otp_expires_at' => 'datetime',
    ];
}
