<?php

namespace App\Modules\crm\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Enquiry extends Model
{
    use SoftDeletes;
    protected $table = 'enquiry';

    protected $fillable = [
        'enquiry_no',
        'convert',
        'log_status',
        'status',
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'current_followup_date'
    ];

     public function followups()
    {
        return $this->hasMany(Followup::class, 'enquiry_id');
    }

}