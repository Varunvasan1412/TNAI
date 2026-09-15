<?php

namespace App\Modules\Tnai\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\TnaiUnit;
use App\Traits\ApiResponse;

class TnaiUnitController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of public TNAI Units.
     * Only returns approved and active TNAI Units.
     */
    public function index(Request $request)
    {
        $query = TnaiUnit::where('approval_status', 'approved')
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

        return $this->success($query->get(), 'TNAI Units retrieved successfully');
    }

    /**
     * Show a specific public TNAI Unit
     */
    public function show($id)
    {
        $tnaiUnit = TnaiUnit::where('approval_status', 'approved')
                            ->where('status', 'active')
                            ->find($id);

        if (!$tnaiUnit) {
            return $this->error('TNAI Unit not found or not published', 404);
        }

        return $this->success($tnaiUnit, 'TNAI Unit retrieved successfully');
    }
}
