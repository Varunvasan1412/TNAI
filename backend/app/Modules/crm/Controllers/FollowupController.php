<?php

namespace App\Modules\crm\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\crm\Models\Followup;
use App\Modules\crm\Models\Enquiry;

class FollowupController extends Controller
{
    public function store(Request $request)
    {
        if ($request->has('followup_date') && !$request->has('followupdate')) {
            $request->merge(['followupdate' => $request->followup_date]);
        } elseif ($request->has('current_followup_date') && !$request->has('followupdate')) {
            $request->merge(['followupdate' => $request->current_followup_date]);
        }

        $request->validate([
            'enquiry_id'   => 'required|exists:enquiry,id',
            'followupdate' => 'required|date',
            'remarks'      => 'required',
            'status'       => 'required'
        ]);

        $followup = Followup::create([
            'enquiry_id'   => $request->enquiry_id,
            'followupdate' => $request->followupdate,
            'remarks'      => $request->remarks,
            'status'       => $request->status
        ]);

        if ($followup->enquiry) {
            $followup->enquiry->update([
                'current_followup_date' => $request->followupdate
            ]);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Followup created successfully',
            'data'    => $followup
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $enquiry = Enquiry::find($id);

        if (!$enquiry) {
            return response()->json([
                'status' => false,
                'message' => 'Enquiry not found'
            ], 404);
        }

        if ($request->has('followup_date') && !$request->has('followupdate')) {
            $request->merge(['followupdate' => $request->followup_date]);
        } elseif ($request->has('current_followup_date') && !$request->has('followupdate')) {
            $request->merge(['followupdate' => $request->current_followup_date]);
        }

        $request->validate([
            'followupdate' => 'required|date',
            'remarks'      => 'required',
            'status'       => 'required'
        ]);

        $followup = Followup::where('enquiry_id', $enquiry->id)->latest()->first();

        if ($followup) {
            $followup->update([
                'followupdate' => $request->followupdate,
                'remarks'      => $request->remarks,
                'status'       => $request->status
            ]);
        } else {
            $followup = Followup::create([
                'enquiry_id'   => $enquiry->id,
                'followupdate' => $request->followupdate,
                'remarks'      => $request->remarks,
                'status'       => $request->status
            ]);
        }

        $enquiry->update([
            'current_followup_date' => $request->followupdate
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Followup updated successfully',
            'data'    => $followup->makeHidden('enquiry')
        ]);
    }

    // Soft Delete
    public function delete($id)
    {
        $followup = Followup::find($id);

        if (!$followup) {
            return response()->json([
                'status' => false,
                'message' => 'Followup not found'
            ], 404);
        }

        $followup->status = 0;
        $followup->save();

        if ($followup->enquiry) {
            $latestFollowup = Followup::where('enquiry_id', $followup->enquiry_id)
                ->where('status', '!=', '0')
                ->latest('followupdate')
                ->first();

            $followup->enquiry->update([
                'current_followup_date' => $latestFollowup ? $latestFollowup->followupdate : null
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'Followup deleted successfully'
        ]);
    }
}