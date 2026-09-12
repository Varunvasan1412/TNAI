<?php

namespace App\Modules\Product\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductSectionField extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'product_section_fields';

    protected $fillable = [
        'product_id',
        'product_section_id',
        'field_type',
        'field_label',
        'field_value',
        'file_path',
        'order_index',
        'status',
        'log_status'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function section()
    {
        return $this->belongsTo(ProductSection::class, 'product_section_id', 'id');
    }
}
