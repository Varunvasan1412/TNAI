<?php

namespace App\Modules\crm\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\crm\Models\Enquiry;
use App\Modules\crm\Models\Followup;

class EnquiryController extends Controller
{
    public function submitEnquiry(Request $request)
    {
        if ($request->has('followup_date') && !$request->has('followupdate')) {
            $request->merge(['followupdate' => $request->followup_date]);
        } elseif ($request->has('current_followup_date') && !$request->has('followupdate')) {
            $request->merge(['followupdate' => $request->current_followup_date]);
        }

        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'subject' => 'nullable',
            'message' => 'required',
            'followupdate' => 'nullable|date',
            'status' => 'nullable',
            'remarks' => 'nullable'
        ]);

        $lastEnquiry = Enquiry::latest('id')->first();

        $nextId = $lastEnquiry ? $lastEnquiry->id + 1 : 1;

        $enquiryNo = 'ENQ' . str_pad($nextId, 4, '0', STR_PAD_LEFT);

        $enquiry = Enquiry::create([
            'enquiry_no' => $enquiryNo,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'subject' => $request->subject,
            'message' => $request->message,
            'log_status' => 1,
        ]);

        \App\Modules\crm\Models\Followup::create([
            'enquiry_id' => $enquiry->id,
            'followupdate' => $request->followupdate ?? now()->format('Y-m-d'),
            'status' => 'Open',
            'remarks' => '',
        ]);

        // Hide everything except the 5 specific fields
        $enquiry->setVisible([
            'name',
            'email',
            'phone',
            'subject',
            'message'
        ]);

        // Send confirmation email to the user who submitted the enquiry
        try {
            \Illuminate\Support\Facades\Mail::to($enquiry->email)->send(new \App\Mail\EnquirySubmittedMail($enquiry));
        } catch (\Exception $e) {
            // Log the error but don't fail the enquiry submission if email fails
            \Illuminate\Support\Facades\Log::error('Failed to send enquiry email: ' . $e->getMessage());
        }

        return response()->json([
            'status' => true,
            'message' => 'Enquiry submitted successfully',
            'data' => $enquiry
        ], 201);
    }



    public function delete($id)
    {
        $enquiry = Enquiry::find($id);

        if (!$enquiry) {
            return response()->json([
                'status' => false,
                'message' => 'Enquiry not found'
            ], 404);
        }

        $enquiry->log_status = 0;
        $enquiry->save();

        return response()->json([
            'status' => true,
            'message' => 'Enquiry deleted successfully'
        ], 200);
    }
    public function index()
    {
        $enquiry = Enquiry::with(['followups' => function($query) {
                $query->latest('id');
            }])
            ->where('log_status', 1)
            ->latest()
            ->get();

        $enquiry->makeHidden(['convert', 'current_followup_date']);

        return response()->json([
            'status' => true,
            'data' => $enquiry
        ]);
    }
    public function convertEnquiry($id)
    {
        $enquiry = Enquiry::find($id);

        if (!$enquiry) {
            return response()->json([
                'status' => false,
                'message' => 'Enquiry not found'
            ], 404);
        }

        $enquiry->update([
            'convert' => 1
        ]);

        $followup = Followup::where('enquiry_id', $enquiry->id)->latest()->first();
        if ($followup) {
            $followup->update([
                'status' => 'Converted'
            ]);
        } else {
            Followup::create([
                'enquiry_id' => $enquiry->id,
                'followupdate' => now()->format('Y-m-d'),
                'remarks' => 'Enquiry converted',
                'status' => 'Converted'
            ]);
        }

        $enquiry->load('followups');

        return response()->json([
            'status' => true,
            'message' => 'Enquiry converted successfully',
            'data' => $enquiry->makeHidden([
                'message',
                'log_status'
            ])
        ]);
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
            'name' => 'sometimes|required',
            'email' => 'sometimes|required|email',
            'phone' => 'sometimes|required',
            'subject' => 'sometimes|required',
            'message' => 'sometimes|required',
            'log_status' => 'nullable|integer',
            'followupdate' => 'nullable|date',
            'status' => 'nullable',
            'remarks' => 'nullable'
        ]);

        $updateData = $request->only([
            'name',
            'email',
            'phone',
            'subject',
            'message',
            'convert'
        ]);
        $updateData['log_status'] = $request->log_status ?? 1;
        $enquiry->update($updateData);

        if ($request->has('followupdate')) {
            $enquiry->update(['current_followup_date' => $request->followupdate]);
        }

        if ($request->filled('followupdate') || $request->filled('remarks') || $request->filled('status')) {
            $followup = Followup::where('enquiry_id', $enquiry->id)->latest()->first();
            if ($followup) {
                $followup->update([
                    'followupdate' => $request->followupdate ?? $followup->followupdate,
                    'remarks' => $request->remarks ?? $followup->remarks,
                    'status' => $request->status ?? $followup->status,
                ]);
            } else {
                Followup::create([
                    'enquiry_id' => $enquiry->id,
                    'followupdate' => $request->followupdate ?? now()->format('Y-m-d'),
                    'remarks' => $request->remarks ?? '',
                    'status' => $request->status ?? 'pending',
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Enquiry updated successfully',
            'data' => $enquiry->load('followups')
        ]);
    }
}
