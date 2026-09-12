<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\Institution;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class InstitutionController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Institution::query();

        // TEMPORARILY DISABLED FOR TESTING WITHOUT AUTH
        // if (!$request->user()) {
        //     $query->where('approval_status', 'approved')->where('status', 'active');
        // } else {
            if ($request->has('approval_status')) {
                $query->where('approval_status', $request->approval_status);
            }
        // }

        $institutions = $query->orderBy('id', 'desc')->get();
        return $this->success($institutions, 'Institutions retrieved successfully');
    }

    /**
     * Store a newly created resource in storage (Maker).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'institution_name' => 'required|string|max:255',
            'institution_code' => 'required|string|max:255|unique:institutions',
            'institution_type' => 'required|string|max:255',
            'affiliation' => 'required|string|max:255',
            'recognized' => 'required|string|max:255',
            'accreditation' => 'required|string|max:255',
            'established_year' => 'required|integer',
            'principal_name' => 'required|string|max:255',
            'tnai_unit' => 'required|string|max:255',
            'sna_unit' => 'required|string|max:255',
            'address' => 'required|string',
            'city' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'pincode' => 'required|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'required|email|unique:institutions',
            'website' => 'required|string|max:255',
            'institution_logo' => 'required|string', // Relaxed for JSON testing
            'institution_image' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:active,inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();

        if (isset($data['status'])) {
            $data['status'] = strtolower($data['status']);
        }

        // File uploads (when moved to form-data)
        if ($request->hasFile('institution_logo')) {
            $data['institution_logo'] = $request->file('institution_logo')->store('institutions/logos', 'public');
        }
        if ($request->hasFile('institution_image')) {
            $data['institution_image'] = $request->file('institution_image')->store('institutions/images', 'public');
        }

        $data['submitted_by'] = $request->user()?->id;
        $data['approval_status'] = 'draft';

        $institution = Institution::create($data);

        return $this->success($institution, 'Institution created as Draft successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $institution = Institution::find($id);
        if (!$institution) return $this->error('Institution not found', 404);
        return $this->success($institution);
    }

    /**
     * Update the specified resource in storage (Maker).
     */
    public function update(Request $request, $id)
    {
        $institution = Institution::find($id);
        if (!$institution) return $this->error('Institution not found', 404);

        $validator = Validator::make($request->all(), [
            'institution_code' => 'sometimes|string|max:255|unique:institutions,institution_code,' . $institution->id,
            'email' => 'sometimes|email|unique:institutions,email,' . $institution->id,
            'status' => 'sometimes|in:active,inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();

        if (isset($data['status'])) {
            $data['status'] = strtolower($data['status']);
        }

        if ($request->hasFile('institution_logo')) {
            if ($institution->institution_logo && Storage::disk('public')->exists($institution->institution_logo)) {
                Storage::disk('public')->delete($institution->institution_logo);
            }
            $data['institution_logo'] = $request->file('institution_logo')->store('institutions/logos', 'public');
        }

        if ($request->hasFile('institution_image')) {
            if ($institution->institution_image && Storage::disk('public')->exists($institution->institution_image)) {
                Storage::disk('public')->delete($institution->institution_image);
            }
            $data['institution_image'] = $request->file('institution_image')->store('institutions/images', 'public');
        }

        // Send back to draft if modified
        if ($institution->approval_status === 'approved') {
            $data['approval_status'] = 'draft';
            $data['reviewed_by'] = null;
            $data['reviewed_date'] = null;
        }

        $institution->update($data);

        return $this->success($institution, 'Institution updated successfully');
    }

    /**
     * Submit for approval (Maker).
     */
    public function submitForApproval($id)
    {
        $institution = Institution::find($id);
        if (!$institution) return $this->error('Institution not found', 404);

        if ($institution->approval_status !== 'draft' && $institution->approval_status !== 'rework') {
            return $this->error('Only draft or rework items can be submitted', 400);
        }

        $institution->update([
            'approval_status' => 'pending',
            'submitted_date' => now(),
        ]);

        return $this->success($institution, 'Submitted for approval successfully');
    }

    /**
     * Approve the resource (Checker / Super Admin).
     */
    public function approve(Request $request, $id)
    {
        $institution = Institution::find($id);
        if (!$institution) return $this->error('Institution not found', 404);

        if ($institution->approval_status !== 'pending') {
            return $this->error('Only pending items can be approved', 400);
        }

        $institution->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'published_date' => now(),
            'rejection_reason' => null, 
        ]);

        return $this->success($institution, 'Institution approved and published successfully');
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

        $institution = Institution::find($id);
        if (!$institution) return $this->error('Institution not found', 404);

        $institution->update([
            'approval_status' => $request->status_type,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return $this->success($institution, 'Institution rejected/sent for rework successfully');
    }

    /**
     * Remove the specified resource (Soft Delete).
     */
    public function destroy($id)
    {
        $institution = Institution::find($id);
        if (!$institution) return $this->error('Institution not found', 404);

        // Soft delete handles hiding it, no need to manually delete images unless requested.
        $institution->delete();
        return $this->success(null, 'Institution deleted successfully');
    }

    /**
     * Bulk Upload Institutions via CSV
     */
    public function bulkUpload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|mimes:csv,txt'
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $file = $request->file('file');
        $csvData = file_get_contents($file);
        $rows = array_map('str_getcsv', explode("\n", $csvData));
        $header = array_shift($rows);

        $successCount = 0;
        $errors = [];

        foreach ($rows as $index => $row) {
            if (count($row) != count($header)) {
                continue; // Skip malformed rows
            }
            $data = array_combine($header, $row);

            // Basic validation for the row
            if (empty($data['institution_name']) || empty($data['institution_code']) || empty($data['email'])) {
                $errors[] = "Row " . ($index + 2) . " skipped: Missing required fields.";
                continue;
            }

            // Check if institution_code or email already exists
            if (Institution::where('institution_code', $data['institution_code'])->orWhere('email', $data['email'])->exists()) {
                $errors[] = "Row " . ($index + 2) . " skipped: Duplicate institution_code or email.";
                continue;
            }

            try {
                Institution::create([
                    'institution_name' => $data['institution_name'],
                    'institution_code' => $data['institution_code'],
                    'institution_type' => $data['institution_type'] ?? 'Unknown',
                    'affiliation' => $data['affiliation'] ?? 'Unknown',
                    'recognized' => $data['recognized'] ?? 'Unknown',
                    'accreditation' => $data['accreditation'] ?? 'Unknown',
                    'established_year' => $data['established_year'] ?? date('Y'),
                    'principal_name' => $data['principal_name'] ?? 'Unknown',
                    'tnai_unit' => $data['tnai_unit'] ?? 'Unknown',
                    'sna_unit' => $data['sna_unit'] ?? 'Unknown',
                    'address' => $data['address'] ?? 'Unknown',
                    'city' => $data['city'] ?? 'Unknown',
                    'district' => $data['district'] ?? 'Unknown',
                    'state' => $data['state'] ?? 'Unknown',
                    'pincode' => $data['pincode'] ?? 'Unknown',
                    'phone' => $data['phone'] ?? null,
                    'email' => $data['email'],
                    'website' => $data['website'] ?? 'Unknown',
                    'institution_logo' => 'placeholder.png', // Needs manual update later
                    'status' => 'active',
                    'approval_status' => 'draft', // Important: Uploaded as draft
                    'submitted_by' => $request->user()?->id,
                ]);
                $successCount++;
            } catch (\Exception $e) {
                $errors[] = "Row " . ($index + 2) . " failed: " . $e->getMessage();
            }
        }

        return $this->success([
            'successful_uploads' => $successCount,
            'errors' => $errors
        ], 'Bulk upload process completed');
    }
}
