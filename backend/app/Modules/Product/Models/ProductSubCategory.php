<?php

namespace App\Modules\Product\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductSubCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'product_sub_categories';

    protected $fillable = [
        'category_id',
        'sub_category_name',
        'sub_category_description',
        'status',
        'log_status'
    ];

    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'category_id', 'id');
    }

    public function divisions()
    {
        return $this->hasMany(ProductSubcategoryDivision::class, 'sub_category_id', 'id')->where('log_status', 1);
    }
}
