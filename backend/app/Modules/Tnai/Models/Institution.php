<?php

namespace App\Modules\Tnai\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Institution extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'institution_name', 'institution_code', 'institution_type', 'affiliation',
        'recognized', 'accreditation', 'established_year', 'principal_name',
        'tnai_unit', 'sna_unit', 'address', 'city', 'district', 'state', 'pincode',
        'phone', 'email', 'website', 'institution_logo', 'institution_image',
        'description', 'status', 'college_user_id',
        'approval_status', 'submitted_by', 'submitted_date', 'reviewed_by',
        'reviewed_date', 'rejection_reason', 'admin_remarks', 'published_date'
    ];

    protected $casts = [
        'established_year' => 'integer',
        'submitted_date' => 'datetime',
        'reviewed_date' => 'datetime',
        'published_date' => 'datetime',
    ];

    public function collegeUser()
    {
        return $this->belongsTo(User::class, 'college_user_id');
    }

    public function submittedBy()
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }

    public function reviewedBy()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
