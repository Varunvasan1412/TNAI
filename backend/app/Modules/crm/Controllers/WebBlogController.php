<?php

namespace App\Modules\crm\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\crm\Models\Blog;
use Illuminate\Http\Request;

class WebBlogController extends Controller
{
    public function index()
    {
        // Only show if status = 1 and log_status = 1
        $blogs = Blog::where('status', 1)->where('log_status', 1)->get();

        return response()->json([
            'status' => true,
            'message' => 'Blogs retrieved successfully',
            'data' => $blogs
        ], 200);
    }

    public function show($id)
    {
        // Only show if status = 1 and log_status = 1
        $blog = Blog::where('status', 1)->where('log_status', 1)->find($id);

        if (!$blog) {
            return response()->json([
                'status' => false,
                'message' => 'Blog not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Blog retrieved successfully',
            'data' => $blog->load('images')
        ], 200);
    }
}
