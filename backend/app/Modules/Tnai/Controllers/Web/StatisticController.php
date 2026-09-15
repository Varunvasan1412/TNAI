<?php

namespace App\Modules\Tnai\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\Statistic;
use App\Traits\ApiResponse;

class StatisticController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of public statistics/counters.
     * Only returns approved and active statistics.
     */
    public function index(Request $request)
    {
        $query = Statistic::where('approval_status', 'approved')
                          ->where('status', 'active');

        // Sort by display_order ascending
        $query->orderBy('display_order', 'asc');

        return $this->success($query->get(), 'Statistics retrieved successfully');
    }

    /**
     * Show a specific public statistic/counter
     */
    public function show($id)
    {
        $statistic = Statistic::where('approval_status', 'approved')
                              ->where('status', 'active')
                              ->find($id);

        if (!$statistic) {
            return $this->error('Statistic not found or not published', 404);
        }

        return $this->success($statistic, 'Statistic retrieved successfully');
    }
}
