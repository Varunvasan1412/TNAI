<?php

namespace App\Modules\Product\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductEnquiry extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'product_name',
        'part_number_sku',
        'category',
        'subcategory',
        'further_customization',
        'name',
        'phone_number',
        'email',
        'topic',
        'message',
        'current_followup_date',
        'convert',
        'log_status'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function followups()
    {
        return $this->hasMany(ProductEnquiryFollowup::class, 'product_enquiry_id', 'id');
    }
}
