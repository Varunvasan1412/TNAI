<?php

namespace App\Modules\Tnai\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OfficeBearer extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'bearer_names',
        'student_id',
        'designation',
        'academic_year',
        'course',
        'year_of_study',
        'photo',
        'mobile_number',
        'email',
        'from_date',
        'to_date',
        'display_order',
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
        'bearer_names' => 'array',
        'from_date' => 'date',
        'to_date' => 'date',
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
