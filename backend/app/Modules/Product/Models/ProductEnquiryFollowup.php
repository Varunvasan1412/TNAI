<?php

namespace App\Modules\Product\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductEnquiryFollowup extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_enquiry_id',
        'followupdate',
        'remarks',
        'status',
        'log_status'
    ];
}
