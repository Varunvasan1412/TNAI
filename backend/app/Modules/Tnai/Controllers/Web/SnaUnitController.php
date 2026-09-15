<?php

namespace App\Modules\Tnai\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\SnaUnit;
use App\Traits\ApiResponse;

class SnaUnitController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of public SNA Units.
     * Only returns approved and active SNA Units.
     */
    public function index(Request $request)
    {
        $query = SnaUnit::where('approval_status', 'approved')
                        ->where('status', 'active');

        // Optional filter by district
        if ($request->has('district')) {
            $query->where('district', $request->district);
        }

        // Optional filter by state
        if ($request->has('state')) {
            $query->where('state', $request->state);
        }

        // Sort alphabetically by unit name
        $query->orderBy('unit_name', 'asc');

        return $this->success($query->get(), 'SNA Units retrieved successfully');
    }

    /**
     * Show a specific public SNA Unit
     */
    public function show($id)
    {
        $snaUnit = SnaUnit::where('approval_status', 'approved')
                          ->where('status', 'active')
                          ->find($id);

        if (!$snaUnit) {
            return $this->error('SNA Unit not found or not published', 404);
        }

        return $this->success($snaUnit, 'SNA Unit retrieved successfully');
    }
}
