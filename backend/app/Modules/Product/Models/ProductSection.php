<?php

namespace App\Modules\Product\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductSection extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'product_sections';

    protected $fillable = [
        'product_id',
        'title',
        'order_index',
        'status',
        'log_status'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function fields()
    {
        return $this->hasMany(ProductSectionField::class, 'product_section_id', 'id')->orderBy('order_index');
    }
}
