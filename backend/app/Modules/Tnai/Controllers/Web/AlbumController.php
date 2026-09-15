<?php

namespace App\Modules\Tnai\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\Album;
use App\Traits\ApiResponse;

class AlbumController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of public photo albums.
     * Only returns approved and active albums.
     */
    public function index(Request $request)
    {
        $query = Album::where('approval_status', 'approved')
                      ->where('status', 'active');

        // Optional filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Sort by date descending
        $query->orderBy('date', 'desc');

        return $this->success($query->get(), 'Albums retrieved successfully');
    }

    /**
     * Show a specific public album with all its approved images
     */
    public function show($id)
    {
        // Fetch album and eager load ONLY approved images, sorted by display order
        $album = Album::with(['images' => function($query) {
            $query->where('approval_status', 'approved')
                  ->orderBy('display_order', 'asc');
        }])
        ->where('approval_status', 'approved')
        ->where('status', 'active')
        ->find($id);

        if (!$album) {
            return $this->error('Album not found or not published', 404);
        }

        return $this->success($album, 'Album and its images retrieved successfully');
    }
}
