<?php

namespace App\Modules\Tnai\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;

class NewsCircular extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'content_type', 'title', 'short_description', 'full_content',
        'featured_image', 'publication_date', 'reference_number', 'circular_date',
        'attachment', 'external_url', 'display_on_homepage', 'display_order', 'status',
        'approval_status', 'submitted_by', 'submitted_date', 'reviewed_by',
        'reviewed_date', 'rejection_reason', 'admin_remarks', 'published_date'
    ];

    protected $casts = [
        'publication_date' => 'date',
        'circular_date' => 'date',
        'display_on_homepage' => 'boolean',
        'display_order' => 'integer',
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
