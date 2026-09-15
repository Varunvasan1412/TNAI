<?php

namespace App\Modules\Tnai\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\GalleryImage;
use App\Traits\ApiResponse;

class GalleryImageController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of public gallery images.
     * Only returns approved images.
     */
    public function index(Request $request)
    {
        $query = GalleryImage::with('album:id,title')
                             ->where('approval_status', 'approved');

        // Optional filter by album_id
        if ($request->has('album_id')) {
            $query->where('album_id', $request->album_id);
        }

        // Sort by display order
        $query->orderBy('display_order', 'asc');

        return $this->success($query->get(), 'Gallery images retrieved successfully');
    }

    /**
     * Show a specific public gallery image
     */
    public function show($id)
    {
        $image = GalleryImage::with('album:id,title')
                             ->where('approval_status', 'approved')
                             ->find($id);

        if (!$image) {
            return $this->error('Gallery image not found or not published', 404);
        }

        return $this->success($image, 'Gallery image retrieved successfully');
    }
}
