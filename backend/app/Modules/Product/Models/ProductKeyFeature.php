<?php

namespace App\Modules\Product\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductKeyFeature extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'product_keyfeatures';

    protected $fillable = [
        'product_id',
        'section_title',
        'feature_name',
        'value',
        'status',
        'log_status'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
