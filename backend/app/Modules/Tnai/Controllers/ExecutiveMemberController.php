<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\ExecutiveMember;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ExecutiveMemberController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the resource.
     * Admins see all. Super Admins see all. Public sees only approved.
     */
    public function index(Request $request)
    {
        $query = ExecutiveMember::query();

        // TEMPORARILY DISABLED FOR TESTING WITHOUT AUTH
        // if (!$request->user()) {
        //     $query->where('approval_status', 'approved')->where('status', 'active');
        // } else {
            if ($request->has('approval_status')) {
                $query->where('approval_status', $request->approval_status);
            }
        // }

        $members = $query->orderBy('display_order', 'asc')->get();
        return $this->success($members, 'Executive members retrieved successfully');
    }

    /**
     * Store a newly created resource in storage (Maker).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'profile_photo' => 'required', // Relaxed to allow string URL for JSON testing
            'display_order' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();

        if (isset($data['status'])) {
            $data['status'] = strtolower($data['status']);
        }

        // Handle File Upload
        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_photo')->store('executive_members', 'public');
            $data['profile_photo'] = $path;
        }

        // Set Maker Fields
        $data['submitted_by'] = $request->user()?->id;
        $data['approval_status'] = 'draft';

        $member = ExecutiveMember::create($data);

        return $this->success($member, 'Executive member created as Draft successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $member = ExecutiveMember::find($id);
        if (!$member) return $this->error('Member not found', 404);
        return $this->success($member);
    }

    /**
     * Update the specified resource (Maker).
     */
    public function update(Request $request, $id)
    {
        $member = ExecutiveMember::find($id);
        if (!$member) return $this->error('Member not found', 404);

        $data = $request->all();

        if (isset($data['status'])) {
            $data['status'] = strtolower($data['status']);
        }

        if ($request->hasFile('profile_image')) {
            // Delete old photo
            if ($member->profile_photo) {
                Storage::disk('public')->delete($member->profile_photo);
            }
            $path = $request->file('profile_photo')->store('executive_members', 'public');
            $data['profile_photo'] = $path;
        }

        // If it was already approved, editing it sends it back to Draft
        if ($member->approval_status === 'approved') {
            $data['approval_status'] = 'draft';
            $data['reviewed_by'] = null;
            $data['reviewed_date'] = null;
        }

        $member->update($data);

        return $this->success($member, 'Executive member updated successfully');
    }

    /**
     * Submit for approval (Maker).
     */
    public function submitForApproval($id)
    {
        $member = ExecutiveMember::find($id);
        if (!$member) return $this->error('Member not found', 404);

        if ($member->approval_status !== 'draft' && $member->approval_status !== 'rework') {
            return $this->error('Only draft or rework items can be submitted', 400);
        }

        $member->update([
            'approval_status' => 'pending',
            'submitted_date' => now(),
        ]);

        return $this->success($member, 'Submitted for approval successfully');
    }

    /**
     * Approve the resource (Checker / Super Admin).
     */
    public function approve(Request $request, $id)
    {
        $member = ExecutiveMember::find($id);
        if (!$member) return $this->error('Member not found', 404);

        if ($member->approval_status !== 'pending') {
            return $this->error('Only pending items can be approved', 400);
        }

        $member->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'published_date' => now(),
            'rejection_reason' => null, // Clear any past rejection reasons
        ]);

        return $this->success($member, 'Item approved and published successfully');
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

        $member = ExecutiveMember::find($id);
        if (!$member) return $this->error('Member not found', 404);

        $member->update([
            'approval_status' => $request->status_type,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return $this->success($member, 'Item rejected/sent for rework successfully');
    }

    /**
     * Remove the specified resource.
     */
    public function destroy($id)
    {
        $member = ExecutiveMember::find($id);
        if (!$member) return $this->error('Member not found', 404);

        if ($member->profile_photo) {
            Storage::disk('public')->delete($member->profile_photo);
        }

        $member->delete();
        return $this->success(null, 'Member deleted successfully');
    }
}
