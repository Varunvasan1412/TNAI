<?php

namespace App\Modules\crm\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Blog extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'blogs';

    protected $fillable = [
        'author_name',
        'blog_title',
        'short_description',
        'blog_description',
        'blog_image',
        'log_status',
        'status',
        'type'
    ];

    public function images()
    {
        return $this->hasMany(BlogImage::class);
    }
}
