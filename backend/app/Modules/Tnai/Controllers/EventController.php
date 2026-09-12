<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\Event;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the resource.
     * Public sees only approved. Admins see all.
     */
    public function index(Request $request)
    {
        $query = Event::query();

        // TEMPORARILY DISABLED FOR TESTING WITHOUT AUTH
        // if (!$request->user()) {
        //     $query->where('approval_status', 'approved')->where('status', 'active');
        // } else {
            if ($request->has('approval_status')) {
                $query->where('approval_status', $request->approval_status);
            }
        // }

        $events = $query->orderBy('display_order', 'asc')->get();
        return $this->success($events, 'Events retrieved successfully');
    }

    /**
     * Store a newly created resource in storage (Maker).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'event_title' => 'required|string|max:255',
            'event_category' => 'required|string|max:255',
            'short_description' => 'required|string',
            'detailed_description' => 'required|string',
            'event_banner' => 'required|string', // Relaxed for JSON testing
            'start_date' => 'required|date',
            'start_time' => 'required',
            'end_date' => 'required|date',
            'end_time' => 'required',
            'venue' => 'required|string|max:255',
            'address' => 'required|string',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'registration_required' => 'required|boolean',
            'registration_url' => 'nullable|url',
            'contact_person' => 'required|string|max:255',
            'contact_email' => 'required|email',
            'contact_phone' => 'required|string|max:20',
            'event_brochure' => 'required|string', // Relaxed for JSON testing
            'display_order' => 'required|integer',
            'organizing_chairperson' => 'required|string|max:255',
            'organizing_secretary' => 'required|string|max:255',
            'status' => 'sometimes|in:active,inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();
        
        if (isset($data['status'])) {
            $data['status'] = strtolower($data['status']);
        }

        // Handle File Uploads (when they switch to form-data)
        if ($request->hasFile('event_banner')) {
            $data['event_banner'] = $request->file('event_banner')->store('events/banners', 'public');
        }
        if ($request->hasFile('event_brochure')) {
            $data['event_brochure'] = $request->file('event_brochure')->store('events/brochures', 'public');
        }

        $data['submitted_by'] = $request->user()?->id;
        $data['approval_status'] = 'draft';

        $event = Event::create($data);

        return $this->success($event, 'Event created as Draft successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $event = Event::find($id);
        if (!$event) return $this->error('Event not found', 404);
        return $this->success($event);
    }

    /**
     * Update the specified resource (Maker).
     */
    public function update(Request $request, $id)
    {
        $event = Event::find($id);
        if (!$event) return $this->error('Event not found', 404);

        $data = $request->all();

        if ($request->hasFile('event_banner')) {
            if ($event->event_banner && Storage::disk('public')->exists($event->event_banner)) {
                Storage::disk('public')->delete($event->event_banner);
            }
            $data['event_banner'] = $request->file('event_banner')->store('events/banners', 'public');
        }

        if ($request->hasFile('event_brochure')) {
            if ($event->event_brochure && Storage::disk('public')->exists($event->event_brochure)) {
                Storage::disk('public')->delete($event->event_brochure);
            }
            $data['event_brochure'] = $request->file('event_brochure')->store('events/brochures', 'public');
        }

        // If it was already approved, editing it sends it back to Draft
        if ($event->approval_status === 'approved') {
            $data['approval_status'] = 'draft';
            $data['reviewed_by'] = null;
            $data['reviewed_date'] = null;
        }

        $event->update($data);

        return $this->success($event, 'Event updated successfully');
    }

    /**
     * Submit for approval (Maker).
     */
    public function submitForApproval($id)
    {
        $event = Event::find($id);
        if (!$event) return $this->error('Event not found', 404);

        if ($event->approval_status !== 'draft' && $event->approval_status !== 'rework') {
            return $this->error('Only draft or rework items can be submitted', 400);
        }

        $event->update([
            'approval_status' => 'pending',
            'submitted_date' => now(),
        ]);

        return $this->success($event, 'Submitted for approval successfully');
    }

    /**
     * Approve the resource (Checker / Super Admin).
     */
    public function approve(Request $request, $id)
    {
        $event = Event::find($id);
        if (!$event) return $this->error('Event not found', 404);

        if ($event->approval_status !== 'pending') {
            return $this->error('Only pending items can be approved', 400);
        }

        $event->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'published_date' => now(),
            'rejection_reason' => null, 
        ]);

        return $this->success($event, 'Event approved and published successfully');
    }

    /**
     * Reject the resource (Checker / Super Admin).
     */
    public function reject(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'rejection_reason' => 'required|string',
            'status_type' => 'required|in:rejected,rework'
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $event = Event::find($id);
        if (!$event) return $this->error('Event not found', 404);

        $event->update([
            'approval_status' => $request->status_type,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return $this->success($event, 'Event rejected/sent for rework successfully');
    }

    /**
     * Remove the specified resource.
     */
    public function destroy($id)
    {
        $event = Event::find($id);
        if (!$event) return $this->error('Event not found', 404);

        // Delete files
        if ($event->event_banner && Storage::disk('public')->exists($event->event_banner)) {
            Storage::disk('public')->delete($event->event_banner);
        }
        if ($event->event_brochure && Storage::disk('public')->exists($event->event_brochure)) {
            Storage::disk('public')->delete($event->event_brochure);
        }

        $event->delete();
        return $this->success(null, 'Event deleted successfully');
    }
}
