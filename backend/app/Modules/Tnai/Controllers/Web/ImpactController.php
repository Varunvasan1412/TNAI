<?php

namespace App\Modules\Tnai\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\Impact;
use App\Traits\ApiResponse;

class ImpactController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of public impacts.
     * Only returns approved and active impacts.
     */
    public function index(Request $request)
    {
        $query = Impact::where('approval_status', 'approved')
                       ->where('status', 'active');

        // Optional filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Sort by impact date descending (latest first)
        $query->orderBy('impact_date', 'desc');

        return $this->success($query->get(), 'Impacts retrieved successfully');
    }

    /**
     * Show a specific public impact
     */
    public function show($id)
    {
        $impact = Impact::where('approval_status', 'approved')
                        ->where('status', 'active')
                        ->find($id);

        if (!$impact) {
            return $this->error('Impact not found or not published', 404);
        }

        return $this->success($impact, 'Impact retrieved successfully');
    }
}
