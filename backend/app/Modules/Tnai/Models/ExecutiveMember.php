<?php

namespace App\Modules\Tnai\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class ExecutiveMember extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'designation',
        'position',
        'profile_photo',
        'qualification',
        'professional_experience',
        'short_biography',
        'email',
        'mobile_number',
        'address',
        'linkedin_link',
        'display_order',
        'status',
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
        return $this->belongsTo(User::class, 'submitted_by');
    }

    public function reviewedBy()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
