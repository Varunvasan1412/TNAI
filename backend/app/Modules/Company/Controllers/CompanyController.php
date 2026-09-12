<?php

namespace App\Modules\Company\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Company\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    /**
     * Get the current company settings (assuming single tenant for now).
     */
    public function index()
    {
        // For a single-tenant app, we just get the first record.
        // If multi-tenant, this would be $request->user()->company.
        $company = Company::first();

        if (!$company) {
            return response()->json(['message' => 'No company settings found.', 'data' => null], 404);
        }

        // Prepend /uploads/ to image paths for the frontend
        if ($company->main_logo) {
            $company->main_logo = '/uploads/' . $company->main_logo;
        }
        if ($company->favicon) {
            $company->favicon = '/uploads/' . $company->favicon;
        }

        return response()->json(['data' => $company], 200);
    }

    /**
     * Update or Create company settings.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'company_name' => 'nullable|string|max:255',
            'contact_email' => 'nullable|email|max:255',
            'phone_number' => 'nullable|string|max:50',
            'company_address' => 'nullable|string',
            'primary_color' => 'nullable|string|max:20',
            'secondary_color' => 'nullable|string|max:20',
            'smtp_sender_name' => 'nullable|string|max:255',
            'smtp_email_address' => 'nullable|email|max:255',
            'smtp_password' => 'nullable|string|max:255',
            'timezone' => 'nullable|string|max:100',
            'linkedin_url' => 'nullable|url',
            'twitter_url' => 'nullable|url',
            'facebook_url' => 'nullable|url',
            'main_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'favicon' => 'nullable|mimes:ico,png|max:1024',
        ]);

        $company = Company::first() ?? new Company();

        // Handle File Uploads (Directly to public/uploads)
        if ($request->hasFile('main_logo')) {
            if ($company->main_logo && file_exists(public_path('uploads/' . $company->main_logo))) {
                @unlink(public_path('uploads/' . $company->main_logo));
            }
            $file = $request->file('main_logo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/company/logos'), $filename);
            $validatedData['main_logo'] = 'company/logos/' . $filename;
        }

        if ($request->hasFile('favicon')) {
            if ($company->favicon && file_exists(public_path('uploads/' . $company->favicon))) {
                @unlink(public_path('uploads/' . $company->favicon));
            }
            $file = $request->file('favicon');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/company/favicons'), $filename);
            $validatedData['favicon'] = 'company/favicons/' . $filename;
        }

        $validatedData['updated_by'] = $request->user() ? $request->user()->id : null;

        if (!$company->exists) {
            $validatedData['created_by'] = $validatedData['updated_by'];
        }

        $company->fill($validatedData);
        $company->save();

        // Clear the cache so the AppServiceProvider picks up the new settings
        \Illuminate\Support\Facades\Cache::forget('company_settings');

        return response()->json([
            'message' => 'Company settings saved successfully.',
            'data' => $company
        ], 200);
    }
}
