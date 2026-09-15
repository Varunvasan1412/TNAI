<?php

namespace App\Modules\Tnai\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\Activity;
use App\Traits\ApiResponse;

class ActivityController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of public activities.
     * Only returns approved and active activities.
     */
    public function index(Request $request)
    {
        $query = Activity::where('approval_status', 'approved')
                         ->where('status', 'active');

        // Optional filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Sort by activity date descending
        $query->orderBy('activity_date', 'desc');

        return $this->success($query->get(), 'Activities retrieved successfully');
    }

    /**
     * Show a specific public activity
     */
    public function show($id)
    {
        $activity = Activity::where('approval_status', 'approved')
                            ->where('status', 'active')
                            ->find($id);

        if (!$activity) {
            return $this->error('Activity not found or not published', 404);
        }

        return $this->success($activity, 'Activity retrieved successfully');
    }
}
