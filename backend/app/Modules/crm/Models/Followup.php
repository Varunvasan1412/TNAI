<?php

namespace App\Modules\crm\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Followup extends Model
{
    use SoftDeletes;
    protected $table = 'followup';

    protected $fillable = [
        'enquiry_id',
        'followupdate',
        'remarks',
        'status',
        'log_status'
    ];

    public function enquiry()
    {
        return $this->belongsTo(Enquiry::class, 'enquiry_id');
    }
}