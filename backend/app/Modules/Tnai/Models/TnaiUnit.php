<?php

namespace App\Modules\Tnai\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TnaiUnit extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'unit_name',
        'unit_code',
        'branch_zone',
        'unit_head_secretary',
        'contact_person',
        'phone',
        'email',
        'address',
        'district',
        'state',
        'number_of_members',
        'description',
        'image',
        'status',

        // Maker-Checker Fields
        'approval_status',
        'submitted_by',
        'submitted_date',
        'reviewed_by',
        'reviewed_date',
        'rejection_reason',
        'admin_remarks',
        'published_date',
    ];

    protected $casts = [
        'submitted_date' => 'datetime',
        'reviewed_date' => 'datetime',
        'published_date' => 'datetime',
    ];

    public function submittedBy()
    {
        return $this->belongsTo(\App\Models\User::class, 'submitted_by');
    }

    public function reviewedBy()
    {
        return $this->belongsTo(\App\Models\User::class, 'reviewed_by');
    }
}
