<?php

namespace App\Modules\Tnai\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\Event;
use App\Traits\ApiResponse;

class EventController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of public events.
     * Only returns approved and active events.
     */
    public function index(Request $request)
    {
        $query = Event::where('approval_status', 'approved')
                      ->where('status', 'active');

        // Optional: Filter by upcoming/past
        if ($request->has('filter')) {
            if ($request->filter === 'upcoming') {
                $query->where('start_date', '>=', now()->toDateString());
            } elseif ($request->filter === 'past') {
                $query->where('start_date', '<', now()->toDateString());
            }
        }

        // Sort by date descending by default
        $query->orderBy('start_date', 'desc');

        return $this->success($query->get(), 'Events retrieved successfully');
    }

    /**
     * Show a specific public event
     */
    public function show($id)
    {
        $event = Event::where('approval_status', 'approved')
                      ->where('status', 'active')
                      ->find($id);

        if (!$event) {
            return $this->error('Event not found or not published', 404);
        }

        return $this->success($event, 'Event retrieved successfully');
    }
}
