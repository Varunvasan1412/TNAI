<?php

namespace App\Modules\Tnai\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\Newsletter;
use App\Traits\ApiResponse;

class NewsletterController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of public newsletters.
     * Only returns approved and active newsletters.
     */
    public function index(Request $request)
    {
        $query = Newsletter::where('approval_status', 'approved')
                           ->where('status', 'active');

        // Sort by publication date descending by default
        $query->orderBy('publication_date', 'desc');

        return $this->success($query->get(), 'Newsletters retrieved successfully');
    }

    /**
     * Show a specific public newsletter
     */
    public function show($id)
    {
        $newsletter = Newsletter::where('approval_status', 'approved')
                                ->where('status', 'active')
                                ->find($id);

        if (!$newsletter) {
            return $this->error('Newsletter not found or not published', 404);
        }

        return $this->success($newsletter, 'Newsletter retrieved successfully');
    }
}
