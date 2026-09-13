<?php

namespace App\Modules\Tnai\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SnaUnit extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'unit_name',
        'unit_code',
        'institution',
        'establishment_date',
        'sna_advisor',
        'contact_number',
        'email',
        'address',
        'district',
        'state',
        'number_of_members',
        'description',
        'logo',
        'certificate_path',
        'renewal_date',
        'fees_paid_on',
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
        'establishment_date' => 'date',
        'renewal_date' => 'date',
        'fees_paid_on' => 'date',
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
