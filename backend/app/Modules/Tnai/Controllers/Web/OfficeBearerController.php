<?php

namespace App\Modules\Tnai\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\OfficeBearer;
use App\Traits\ApiResponse;

class OfficeBearerController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of public Office Bearers.
     * Only returns approved and active office bearers.
     */
    public function index(Request $request)
    {
        $query = OfficeBearer::where('approval_status', 'approved')
                             ->where('status', 'active');

        // Optional filter by academic year
        if ($request->has('academic_year')) {
            $query->where('academic_year', $request->academic_year);
        }

        // Optional filter by designation
        if ($request->has('designation')) {
            $query->where('designation', $request->designation);
        }

        // Sort by display order ascending
        $query->orderBy('display_order', 'asc');

        return $this->success($query->get(), 'Office Bearers retrieved successfully');
    }

    /**
     * Show a specific public Office Bearer
     */
    public function show($id)
    {
        $officeBearer = OfficeBearer::where('approval_status', 'approved')
                                    ->where('status', 'active')
                                    ->find($id);

        if (!$officeBearer) {
            return $this->error('Office Bearer not found or not published', 404);
        }

        return $this->success($officeBearer, 'Office Bearer retrieved successfully');
    }
}
