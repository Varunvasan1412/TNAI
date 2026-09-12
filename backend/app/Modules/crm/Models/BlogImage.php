<?php

namespace App\Modules\crm\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogImage extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'blog_images';

    protected $fillable = [
        'blog_id',
        'image_path',
    ];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
