<?php

namespace App\Modules\Tnai\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\Download;
use App\Traits\ApiResponse;

class DownloadController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of public downloads.
     * Only returns approved and active downloads.
     */
    public function index(Request $request)
    {
        $query = Download::where('approval_status', 'approved')
                         ->where('status', 'active');

        // Optional filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Sort by publication date descending
        $query->orderBy('publication_date', 'desc');

        return $this->success($query->get(), 'Downloads retrieved successfully');
    }

    /**
     * Show a specific public download
     */
    public function show($id)
    {
        $download = Download::where('approval_status', 'approved')
                            ->where('status', 'active')
                            ->find($id);

        if (!$download) {
            return $this->error('Download not found or not published', 404);
        }

        return $this->success($download, 'Download retrieved successfully');
    }
}
