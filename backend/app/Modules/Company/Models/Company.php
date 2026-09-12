<?php

namespace App\Modules\Company\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;

class Company extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'companies';

    protected $fillable = [
        'company_name',
        'contact_email',
        'phone_number',
        'company_address',
        'main_logo',
        'favicon',
        'primary_color',
        'secondary_color',
        'smtp_sender_name',
        'smtp_email_address',
        'smtp_password',
        'timezone',
        'linkedin_url',
        'twitter_url',
        'facebook_url',
        'created_by',
        'updated_by',
    ];

    /**
     * Get the user that created the company settings.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user that last updated the company settings.
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
