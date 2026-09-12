<?php

namespace App\Modules\Product\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductSubcategoryDivision extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'product_subcategory_divisions';

    protected $fillable = [
        'sub_category_id',
        'division_name',
        'status',
        'log_status'
    ];

    public function subcategory()
    {
        return $this->belongsTo(ProductSubCategory::class, 'sub_category_id', 'id');
    }
}
