<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\NewsCircular;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class NewsCircularController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = NewsCircular::query();

        // TEMPORARILY DISABLED FOR TESTING WITHOUT AUTH
        // if (!$request->user()) {
        //     $query->where('approval_status', 'approved')->where('status', 'active');
        // } else {
            if ($request->has('approval_status')) {
                $query->where('approval_status', $request->approval_status);
            }
        // }

        $items = $query->orderBy('display_order', 'asc')->orderBy('publication_date', 'desc')->get();
        return $this->success($items, 'News and Circulars retrieved successfully');
    }

    /**
     * Store a newly created resource in storage (Maker).
     */
    public function store(Request $request)
    {
        $data = $request->all();

        // Ensure status and content_type are lowercase for DB strictness
        if (isset($data['status'])) $data['status'] = strtolower($data['status']);
        if (isset($data['content_type'])) $data['content_type'] = strtolower($data['content_type']);

        $validator = Validator::make($data, [
            'content_type' => 'required|in:news,circular',
            'title' => 'required|string|max:255',
            'short_description' => 'required|string',
            'full_content' => 'required|string',
            'featured_image' => 'nullable|string', // Relaxed for JSON testing
            'publication_date' => 'required|date',
            'reference_number' => 'nullable|string',
            'circular_date' => 'nullable|date',
            'attachment' => 'required|string', // Relaxed for JSON testing
            'external_url' => 'nullable|url',
            'display_on_homepage' => 'required|boolean',
            'display_order' => 'nullable|integer',
            'status' => 'sometimes|in:active,inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        // Conditional requirement check: circulars need reference_number and circular_date
        if ($data['content_type'] === 'circular') {
            if (empty($data['reference_number']) || empty($data['circular_date'])) {
                return $this->error('Reference Number and Circular Date are required when Content Type is Circular.', 422);
            }
        }

        // File uploads (when moved to form-data)
        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('news_circulars/images', 'public');
        }
        if ($request->hasFile('attachment')) {
            $data['attachment'] = $request->file('attachment')->store('news_circulars/attachments', 'public');
        }

        $data['submitted_by'] = $request->user()?->id;
        $data['approval_status'] = 'draft';

        $item = NewsCircular::create($data);

        return $this->success($item, 'News/Circular created as Draft successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $item = NewsCircular::find($id);
        if (!$item) return $this->error('Record not found', 404);
        return $this->success($item);
    }

    /**
     * Update the specified resource in storage (Maker).
     */
    public function update(Request $request, $id)
    {
        $item = NewsCircular::find($id);
        if (!$item) return $this->error('Record not found', 404);

        $data = $request->all();

        if (isset($data['status'])) $data['status'] = strtolower($data['status']);
        if (isset($data['content_type'])) $data['content_type'] = strtolower($data['content_type']);

        $validator = Validator::make($data, [
            'content_type' => 'sometimes|in:news,circular',
            'status' => 'sometimes|in:active,inactive',
            // Other fields are optional on update
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        if ($request->hasFile('featured_image')) {
            if ($item->featured_image && Storage::disk('public')->exists($item->featured_image)) {
                Storage::disk('public')->delete($item->featured_image);
            }
            $data['featured_image'] = $request->file('featured_image')->store('news_circulars/images', 'public');
        }

        if ($request->hasFile('attachment')) {
            if ($item->attachment && Storage::disk('public')->exists($item->attachment)) {
                Storage::disk('public')->delete($item->attachment);
            }
            $data['attachment'] = $request->file('attachment')->store('news_circulars/attachments', 'public');
        }

        // Send back to draft if modified
        if ($item->approval_status === 'approved') {
            $data['approval_status'] = 'draft';
            $data['reviewed_by'] = null;
            $data['reviewed_date'] = null;
        }

        $item->update($data);

        return $this->success($item, 'News/Circular updated successfully');
    }

    /**
     * Submit for approval (Maker).
     */
    public function submitForApproval($id)
    {
        $item = NewsCircular::find($id);
        if (!$item) return $this->error('Record not found', 404);

        if ($item->approval_status !== 'draft' && $item->approval_status !== 'rework') {
            return $this->error('Only draft or rework items can be submitted', 400);
        }

        $item->update([
            'approval_status' => 'pending',
            'submitted_date' => now(),
        ]);

        return $this->success($item, 'Submitted for approval successfully');
    }

    /**
     * Approve the resource (Checker / Super Admin).
     */
    public function approve(Request $request, $id)
    {
        $item = NewsCircular::find($id);
        if (!$item) return $this->error('Record not found', 404);

        if ($item->approval_status !== 'pending') {
            return $this->error('Only pending items can be approved', 400);
        }

        $item->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'published_date' => now(),
            'rejection_reason' => null, 
        ]);

        return $this->success($item, 'Approved and published successfully');
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

        $item = NewsCircular::find($id);
        if (!$item) return $this->error('Record not found', 404);

        $item->update([
            'approval_status' => $request->status_type,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return $this->success($item, 'Rejected/sent for rework successfully');
    }

    /**
     * Remove the specified resource (Soft Delete).
     */
    public function destroy($id)
    {
        $item = NewsCircular::find($id);
        if (!$item) return $this->error('Record not found', 404);

        $item->delete();
        return $this->success(null, 'Record deleted successfully');
    }
}
