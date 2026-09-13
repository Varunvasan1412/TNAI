<?php

namespace App\Modules\Tnai\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StudentDetail extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'student_name',
        'student_id',
        'admission_number',
        'date_of_birth',
        'gender',
        'course',
        'course_year',
        'academic_year',
        'batch',
        'student_photo',
        'email',
        'mobile_number',
        'parent_guardian_name',
        'parent_guardian_phone',
        'parent_guardian_email',
        'department',
        'admission_year',
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
        'date_of_birth' => 'date',
        'admission_year' => 'integer',
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
