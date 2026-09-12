<?php

namespace App\Modules\Tnai\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'event_title', 'event_category', 'short_description', 'detailed_description',
        'event_banner', 'start_date', 'start_time', 'end_date', 'end_time',
        'venue', 'address', 'city', 'state', 'registration_required', 'registration_url',
        'contact_person', 'contact_email', 'contact_phone', 'event_brochure',
        'display_order', 'status', 'organizing_chairperson', 'organizing_secretary',
        'approval_status', 'submitted_by', 'submitted_date', 'reviewed_by',
        'reviewed_date', 'rejection_reason', 'admin_remarks', 'published_date'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'registration_required' => 'boolean',
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
