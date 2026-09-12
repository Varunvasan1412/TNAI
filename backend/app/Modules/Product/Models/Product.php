<?php

namespace App\Modules\Product\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'products';

    protected $fillable = [
        'product_name',
        'part_number',
        'description',
        'category_id',
        'subcategory_id',
        'division_id',
        'data_sheet',
        'status',
        'log_status',
        'obj_file',
        'mtl_file'
    ];

    protected $appends = ['regular_images', 'three_d_models'];

    public function getRegularImagesAttribute()
    {
        if (!$this->relationLoaded('images')) {
            return [];
        }
        return $this->images->filter(function ($item) {
            return !preg_match('/\.(obj|mtl|glb|gltf)$/i', $item->image_path);
        })->values();
    }

    public function getThreeDModelsAttribute()
    {
        if (!$this->relationLoaded('images')) {
            return [];
        }
        return $this->images->filter(function ($item) {
            return preg_match('/\.(obj|mtl|glb|gltf)$/i', $item->image_path);
        })->values();
    }

    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'category_id', 'id');
    }

    public function subcategory()
    {
        return $this->belongsTo(ProductSubCategory::class, 'subcategory_id', 'id');
    }

    public function division()
    {
        return $this->belongsTo(ProductSubcategoryDivision::class, 'division_id', 'id');
    }

    public function keyFeatures()
    {
        return $this->hasMany(ProductKeyFeature::class, 'product_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id', 'id');
    }

    public function sections()
    {
        return $this->hasMany(ProductSection::class, 'product_id', 'id')->orderBy('order_index');
    }
}
