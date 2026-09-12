<?php

namespace App\Modules\Product\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Product\Models\ProductEnquiry;
use App\Modules\Product\Models\Product;
use App\Traits\ApiResponse;

class WebProductController extends Controller
{
    use ApiResponse;

    public function submitEnquiry(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'further_customization' => 'nullable|string',
            'name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'topic' => 'nullable|string|max:255',
            'message' => 'nullable|string',
        ]);

        $product = Product::with(['category', 'subcategory', 'keyFeatures'])->find($request->product_id);
        
        $partNumber = $product->part_number;
        if (empty($partNumber) && $product->keyFeatures) {
            foreach($product->keyFeatures as $feature) {
                if (stripos($feature->feature_name, 'part number') !== false || stripos($feature->feature_name, 'sku') !== false) {
                    $partNumber = $feature->value;
                    break;
                }
            }
        }

        $enquiryData = [
            'product_name' => $product->product_name,
            'part_number_sku' => $partNumber,
            'category' => $product->category ? $product->category->category_name : null,
            'subcategory' => $product->subcategory ? $product->subcategory->sub_category_name : null,
            'further_customization' => $request->further_customization,
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'topic' => $request->topic,
            'message' => $request->message,
        ];

        // Also add product_id if the model supports it, but since it wasn't in original migration, we pass it just in case it is added later.
        $enquiryData['product_id'] = $request->product_id;

        $enquiry = ProductEnquiry::create($enquiryData);

        \App\Modules\Product\Models\ProductEnquiryFollowup::create([
            'product_enquiry_id' => $enquiry->id,
            'followupdate' => now()->format('Y-m-d'),
            'status' => 'Open',
            'remarks' => '',
        ]);

        return $this->success($enquiry, 'Product enquiry submitted successfully', 201);
    }

    public function index()
    {
        $products = Product::with(['keyFeatures', 'images', 'category', 'subcategory', 'subcategory.divisions', 'division', 'sections.fields'])
            ->where('status', 1)
            ->where('log_status', 1)
            ->latest()
            ->get();

        return response()->json([
            'status' => true,
            'data' => $products
        ]);
    }

    public function show($id)
    {
        $product = Product::with(['keyFeatures', 'images', 'category', 'subcategory', 'subcategory.divisions', 'division', 'sections.fields'])
            ->where('status', 1)
            ->where('log_status', 1)
            ->find($id);

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $product
        ]);
    }
}
