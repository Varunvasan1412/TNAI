<?php

namespace App\Modules\Tnai\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Impact extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'short_summary',
        'detailed_description',
        'category',
        'impact_date',
        'location',
        'beneficiaries_count',
        'featured_image',
        'supporting_images',
        'supporting_document',
        'external_url',
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
        'impact_date' => 'date',
        'supporting_images' => 'array',
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
