<?php

namespace App\Modules\Tnai\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Concern extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'member_name',
        'tnai_membership_number',
        'snai_membership_number',
        'email',
        'mobile_number',
        'institution',
        'branch_zone',
        'concern_category',
        'subject',
        'description',
        'attachment',
        
        // Management
        'concern_status',
        'assigned_to',
        'admin_response',
        'resolution_date',
        'internal_remarks',
    ];

    protected $casts = [
        'resolution_date' => 'date',
    ];

    public function assignedTo()
    {
        return $this->belongsTo(\App\Models\User::class, 'assigned_to');
    }
}
