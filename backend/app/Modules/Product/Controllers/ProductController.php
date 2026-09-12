<?php

namespace App\Modules\Product\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Product\Models\ProductCategory;
use App\Modules\Product\Models\ProductSubCategory;
use App\Modules\Product\Models\ProductSubcategoryDivision;
use App\Modules\Product\Models\Product;
use App\Modules\Product\Models\ProductKeyFeature;
use App\Modules\Product\Models\ProductImage;
use App\Modules\Product\Models\ProductEnquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class ProductController extends Controller
{
    /**
     * Store a newly created blog in storage.+*+---
     */
    public function index_category()
    {
        $blogs = ProductCategory::where('log_status', 1)->get();

        return response()->json([
            'status' => true,
            'message' => 'Product Categories retrieved successfully',
            'data' => $blogs
        ], 200);
    }

    public function store_category(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_name' => 'required|string|max:255',
            'category_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:6048',
            'category_description' => 'required|string',
            'status' => 'required|integer|in:0,1',
            'log_status' => 'nullable|integer|in:0,1',
        ], [
            'category_image.max' => 'The category image size must not exceed 6MB.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $imagePath = null;
        if ($request->hasFile('category_image')) {
            $image = $request->file('category_image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/product_category'), $imageName);
            $imagePath = 'uploads/product_category/' . $imageName;
        }

        $product_category = ProductCategory::create([
            'category_name' => $request->category_name,
            'category_image' => $imagePath,
            'category_description' => $request->category_description,
            'status' => $request->status ?? 1,
            'log_status' => $request->log_status ?? 1,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Product Category created successfully',
            'data' => $product_category
        ], 201);
    }

    public function show_category($id)
    {
        $product_category = ProductCategory::find($id);
        if (!$product_category) {
            return response()->json([
                'status' => false,
                'message' => 'Product Category not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Product Category retrieved successfully',
            'data' => $product_category
        ], 200);
    }

    public function update_category($id, Request $request)
    {
        $product_category = ProductCategory::find($id);
        if (!$product_category) {
            return response()->json([
                'status' => false,
                'message' => 'Product Category not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'category_name' => 'required|string|max:255',
            'category_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:6048',
            'category_description' => 'required|string',
            'status' => 'required|integer|in:0,1',
            'log_status' => 'nullable|integer|in:0,1',
        ], [
            'category_image.max' => 'The category image size must not exceed 6MB.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $imagePath = $product_category->category_image;
        if ($request->hasFile('category_image')) {
            $image = $request->file('category_image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/product_category'), $imageName);
            $imagePath = 'uploads/product_category/' . $imageName;
        }

        $product_category->update([
            'category_name' => $request->category_name,
            'category_image' => $imagePath,
            'category_description' => $request->category_description,
            'status' => $request->status ?? 1,
            'log_status' => $request->log_status ?? 1,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Product Category updated successfully',
            'data' => $product_category
        ], 200);
    }

    public function delete_category($id)
    {
        $product_category = ProductCategory::find($id);
        if (!$product_category) {
            return response()->json([
                'status' => false,
                'message' => 'Product Category not found'
            ], 404);
        }

        $product_category->update(['log_status' => 0]);
        $product_category->delete();

        return response()->json([
            'status' => true,
            'message' => 'Product Category deleted successfully'
        ], 200);
    }

    public function index_subcategory()
    {
        $subcategories = ProductSubCategory::with('divisions')->where('log_status', 1)->get();

        return response()->json([
            'status' => true,
            'message' => 'Product Subcategories retrieved successfully',
            'data' => $subcategories
        ], 200);
    }

    public function store_subcategory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|integer|exists:product_category,id',
            'sub_category_name' => 'required|string|max:255',
            'sub_category_description' => 'required|string',
            'status' => 'nullable|integer|in:0,1',
            'log_status' => 'nullable|integer|in:0,1',
            'divisions' => 'nullable|array',
            'divisions.*.division_name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $subcategory = ProductSubCategory::create([
            'category_id' => $request->category_id,
            'sub_category_name' => $request->sub_category_name,
            'sub_category_description' => $request->sub_category_description,
            'status' => $request->status ?? 1,
            'log_status' => $request->log_status ?? 1,
        ]);

        if ($request->has('divisions') && is_array($request->divisions)) {
            foreach ($request->divisions as $div) {
                ProductSubcategoryDivision::create([
                    'sub_category_id' => $subcategory->id,
                    'division_name' => $div['division_name'],
                    'status' => 1,
                    'log_status' => 1,
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Product Subcategory created successfully',
            'data' => $subcategory->load('divisions')
        ], 201);
    }

    public function show_subcategory($id)
    {
        $subcategory = ProductSubCategory::with('divisions')->find($id);
        if (!$subcategory) {
            return response()->json([
                'status' => false,
                'message' => 'Product Subcategory not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Product Subcategory retrieved successfully',
            'data' => $subcategory
        ], 200);
    }

    public function update_subcategory($id, Request $request)
    {
        $subcategory = ProductSubCategory::find($id);
        if (!$subcategory) {
            return response()->json([
                'status' => false,
                'message' => 'Product Subcategory not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'category_id' => 'required|integer|exists:product_category,id',
            'sub_category_name' => 'required|string|max:255',
            'sub_category_description' => 'required|string',
            'status' => 'nullable|integer|in:0,1',
            'log_status' => 'nullable|integer|in:0,1',
            'divisions' => 'nullable|array',
            'divisions.*.division_name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $subcategory->update([
            'category_id' => $request->category_id,
            'sub_category_name' => $request->sub_category_name,
            'sub_category_description' => $request->sub_category_description,
            'status' => $request->status ?? 1,
            'log_status' => $request->log_status ?? 1,
        ]);

        if ($request->has('divisions') && is_array($request->divisions)) {
            // Soft delete old divisions
            $subcategory->divisions()->update(['log_status' => 0]);
            $subcategory->divisions()->delete();

            foreach ($request->divisions as $div) {
                ProductSubcategoryDivision::create([
                    'sub_category_id' => $subcategory->id,
                    'division_name' => $div['division_name'],
                    'status' => 1,
                    'log_status' => 1,
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Product Subcategory updated successfully',
            'data' => $subcategory->load('divisions')
        ], 200);
    }

    public function delete_subcategory($id)
    {
        $subcategory = ProductSubCategory::find($id);
        if (!$subcategory) {
            return response()->json([
                'status' => false,
                'message' => 'Product Subcategory not found'
            ], 404);
        }

        $subcategory->update(['log_status' => 0]);
        $subcategory->delete();

        // Also delete associated divisions
        foreach ($subcategory->divisions as $div) {
            $div->update(['log_status' => 0]);
            $div->delete();
        }

        return response()->json([
            'status' => true,
            'message' => 'Product Subcategory deleted successfully'
        ], 200);
    }


    // --- PRODUCT CRUD ---

    public function index_product()
    {
        $products = Product::with(['keyFeatures', 'images', 'subcategory.divisions', 'division', 'sections.fields'])->where('log_status', 1)->get();

        return response()->json([
            'status' => true,
            'message' => 'Products retrieved successfully',
            'data' => $products
        ], 200);
    }

    public function store_product(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_name' => 'required|string|max:255',
            'part_number' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|integer|exists:product_category,id',
            'subcategory_id' => 'required|integer|exists:product_sub_categories,id',
            'division_id' => 'nullable|integer|exists:product_subcategory_divisions,id',
            'data_sheet' => 'nullable|file|max:51200',
            'status' => 'nullable|integer|in:0,1',
            'log_status' => 'nullable|integer|in:0,1',
            'images' => 'nullable|array',
            'images.*' => 'file|max:51200', // up to 50MB per file
            'obj_file' => 'nullable|file|max:51200',
            'mtl_file' => 'nullable|file|max:51200',
            'key_features' => 'nullable|array',
            'key_features.*.section_title' => 'nullable|string|max:255',
            'key_features.*.title' => 'required|string|max:255',
            'key_features.*.value' => 'required|string|max:255',
            'sections' => 'nullable|array',
            'sections.*.title' => 'required_with:sections|string|max:255',
            'sections.*.order_index' => 'nullable|integer',
            'sections.*.fields' => 'nullable|array',
            'sections.*.fields.*.field_type' => 'required_with:sections.*.fields|string|in:text,number,rich_text,table,image,file',
            'sections.*.fields.*.field_label' => 'nullable|string|max:255',
            'sections.*.fields.*.field_value' => 'nullable|string',
            'sections.*.fields.*.file' => 'nullable|file|max:51200',
            'sections.*.fields.*.order_index' => 'nullable|integer',
        ], [
            'images.*.max' => 'Each product image size must not exceed 50MB.',
            'data_sheet.max' => 'The data sheet size must not exceed 50MB.',
            'obj_file.max' => 'The OBJ file size must not exceed 50MB.',
            'mtl_file.max' => 'The MTL file size must not exceed 50MB.',
            'sections.*.fields.*.file.max' => 'Each section file size must not exceed 50MB.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $dataSheetPath = null;
        if ($request->hasFile('data_sheet')) {
            $file = $request->file('data_sheet');
            $ext = $file->getClientOriginalExtension() ?: 'bin';
            $fileName = time() . '_datasheet_' . uniqid() . '.' . $ext;
            $file->move(public_path('uploads/products/datasheets'), $fileName);
            $dataSheetPath = 'uploads/products/datasheets/' . $fileName;
        }

        $objFilePath = null;
        if ($request->hasFile('obj_file')) {
            $file = $request->file('obj_file');
            $ext = $file->getClientOriginalExtension() ?: 'obj';
            $fileName = time() . '_obj_' . uniqid() . '.' . $ext;
            $file->move(public_path('uploads/products/models'), $fileName);
            $objFilePath = 'uploads/products/models/' . $fileName;
        }

        $mtlFilePath = null;
        if ($request->hasFile('mtl_file')) {
            $file = $request->file('mtl_file');
            $ext = $file->getClientOriginalExtension() ?: 'mtl';
            $fileName = time() . '_mtl_' . uniqid() . '.' . $ext;
            $file->move(public_path('uploads/products/models'), $fileName);
            $mtlFilePath = 'uploads/products/models/' . $fileName;
        }

        $uploadedFiles = [];
        $allFiles = $request->allFiles();
        
        foreach ($allFiles as $key => $filesArray) {
            if ($key === 'data_sheet' || $key === 'obj_file' || $key === 'mtl_file') continue;
            // We only process arrays of files, or single files
            $filesToProcess = is_array($filesArray) ? $filesArray : [$filesArray];
            
            foreach ($filesToProcess as $file) {
                if ($file instanceof \Illuminate\Http\UploadedFile) {
                    $ext = $file->getClientOriginalExtension() ?: 'bin';
                    $prefix = '_';
                    $fileName = time() . $prefix . uniqid() . '.' . $ext;
                    $file->move(public_path('uploads/products'), $fileName);
                    $uploadedFiles[] = 'uploads/products/' . $fileName;
                }
            }
        }

        $product = Product::create([
            'product_name' => $request->product_name,
            'part_number' => $request->part_number,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'subcategory_id' => $request->subcategory_id,
            'division_id' => $request->division_id,
            'data_sheet' => $dataSheetPath,
            'status' => $request->status ?? 1,
            'log_status' => $request->log_status ?? 1,
            'obj_file' => $objFilePath,
            'mtl_file' => $mtlFilePath,
        ]);

        if (!empty($uploadedFiles)) {
            foreach ($uploadedFiles as $path) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                    'status' => 1,
                    'log_status' => 1,
                ]);
            }
        }

        if ($request->has('key_features') && is_array($request->key_features)) {
            foreach ($request->key_features as $feature) {
                ProductKeyFeature::create([
                    'product_id' => $product->id,
                    'section_title' => $feature['section_title'] ?? null,
                    'feature_name' => $feature['feature_name'] ?? $feature['title'], // Support 'title' key or 'feature_name' key
                    'value' => $feature['value'],
                    'status' => 1,
                    'log_status' => 1,
                ]);
            }
        }

        if ($request->has('sections') && is_array($request->sections)) {
            foreach ($request->sections as $s_index => $sectionData) {
                $section = \App\Modules\Product\Models\ProductSection::create([
                    'product_id' => $product->id,
                    'title' => $sectionData['title'],
                    'order_index' => $sectionData['order_index'] ?? $s_index,
                    'status' => 1,
                    'log_status' => 1,
                ]);

                if (isset($sectionData['fields']) && is_array($sectionData['fields'])) {
                    foreach ($sectionData['fields'] as $f_index => $fieldData) {
                        $filePath = null;
                        
                        if ($request->hasFile("sections.{$s_index}.fields.{$f_index}.file")) {
                            $file = $request->file("sections.{$s_index}.fields.{$f_index}.file");
                            $ext = $file->getClientOriginalExtension() ?: 'bin';
                            $fileName = time() . '_sec_' . uniqid() . '.' . $ext;
                            $file->move(public_path('uploads/product_sections'), $fileName);
                            $filePath = 'uploads/product_sections/' . $fileName;
                        }

                        \App\Modules\Product\Models\ProductSectionField::create([
                            'product_id' => $product->id,
                            'product_section_id' => $section->id,
                            'field_type' => $fieldData['field_type'],
                            'field_label' => $fieldData['field_label'] ?? null,
                            'field_value' => $fieldData['field_value'] ?? null,
                            'file_path' => $filePath,
                            'order_index' => $fieldData['order_index'] ?? $f_index,
                            'status' => 1,
                            'log_status' => 1,
                        ]);
                    }
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Product created successfully',
            'data' => $product->load(['keyFeatures', 'images', 'sections.fields'])
        ], 201);
    }

    public function show_product($id)
    {
        $product = Product::with(['keyFeatures', 'images', 'subcategory.divisions', 'division', 'sections.fields'])->find($id);
        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Product retrieved successfully',
            'data' => $product
        ], 200);
    }

    public function update_product($id, Request $request)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'product_name' => 'required|string|max:255',
            'part_number' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|integer|exists:product_category,id',
            'subcategory_id' => 'required|integer|exists:product_sub_categories,id',
            'division_id' => 'nullable|integer|exists:product_subcategory_divisions,id',
            'data_sheet' => 'nullable|file|max:51200',
            'status' => 'nullable|integer|in:0,1',
            'log_status' => 'nullable|integer|in:0,1',
            'images' => 'nullable|array',
            'images.*' => 'file|max:51200',
            'obj_file' => 'nullable|file|max:51200',
            'mtl_file' => 'nullable|file|max:51200',
            'key_features' => 'nullable|array',
            'key_features.*.section_title' => 'nullable|string|max:255',
            'key_features.*.title' => 'required|string|max:255',
            'key_features.*.value' => 'required|string|max:255',
            'sections' => 'nullable|array',
            'sections.*.title' => 'required_with:sections|string|max:255',
            'sections.*.order_index' => 'nullable|integer',
            'sections.*.fields' => 'nullable|array',
            'sections.*.fields.*.field_type' => 'required_with:sections.*.fields|string|in:text,number,rich_text,table,image,file',
            'sections.*.fields.*.field_label' => 'nullable|string|max:255',
            'sections.*.fields.*.field_value' => 'nullable|string',
            'sections.*.fields.*.file' => 'nullable|file|max:51200',
            'sections.*.fields.*.order_index' => 'nullable|integer',
        ], [
            'images.*.max' => 'Each product image size must not exceed 50MB.',
            'data_sheet.max' => 'The data sheet size must not exceed 50MB.',
            'obj_file.max' => 'The OBJ file size must not exceed 50MB.',
            'mtl_file.max' => 'The MTL file size must not exceed 50MB.',
            'sections.*.fields.*.file.max' => 'Each section file size must not exceed 50MB.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $dataSheetPath = $product->data_sheet;
        if ($request->hasFile('data_sheet')) {
            $file = $request->file('data_sheet');
            $ext = $file->getClientOriginalExtension() ?: 'bin';
            $fileName = time() . '_datasheet_' . uniqid() . '.' . $ext;
            $file->move(public_path('uploads/products/datasheets'), $fileName);
            $dataSheetPath = 'uploads/products/datasheets/' . $fileName;
        }

        $objFilePath = $product->obj_file;
        if ($request->hasFile('obj_file')) {
            $file = $request->file('obj_file');
            $ext = $file->getClientOriginalExtension() ?: 'obj';
            $fileName = time() . '_obj_' . uniqid() . '.' . $ext;
            $file->move(public_path('uploads/products/models'), $fileName);
            $objFilePath = 'uploads/products/models/' . $fileName;
        }

        $mtlFilePath = $product->mtl_file;
        if ($request->hasFile('mtl_file')) {
            $file = $request->file('mtl_file');
            $ext = $file->getClientOriginalExtension() ?: 'mtl';
            $fileName = time() . '_mtl_' . uniqid() . '.' . $ext;
            $file->move(public_path('uploads/products/models'), $fileName);
            $mtlFilePath = 'uploads/products/models/' . $fileName;
        }

        if (count($request->allFiles()) > 0) {
            // New files are appended; existing images are not blindly deleted.

            $uploadedFiles = [];
            $allFiles = $request->allFiles();
            
            foreach ($allFiles as $key => $filesArray) {
                if ($key === 'data_sheet' || $key === 'obj_file' || $key === 'mtl_file') continue;
                // We only process arrays of files, or single files
                $filesToProcess = is_array($filesArray) ? $filesArray : [$filesArray];
                
                foreach ($filesToProcess as $file) {
                    if ($file instanceof \Illuminate\Http\UploadedFile) {
                        $ext = $file->getClientOriginalExtension() ?: 'bin';
                        $prefix = '_';
                        $fileName = time() . $prefix . uniqid() . '.' . $ext;
                        $file->move(public_path('uploads/products'), $fileName);
                        $uploadedFiles[] = 'uploads/products/' . $fileName;
                    }
                }
            }

            foreach ($uploadedFiles as $path) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                    'status' => 1,
                    'log_status' => 1,
                ]);
            }
        }

        $product->update([
            'product_name' => $request->product_name,
            'part_number' => $request->part_number,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'subcategory_id' => $request->subcategory_id,
            'division_id' => $request->division_id,
            'data_sheet' => $dataSheetPath,
            'status' => $request->status ?? 1,
            'log_status' => $request->log_status ?? 1,
            'obj_file' => $objFilePath,
            'mtl_file' => $mtlFilePath,
        ]);

        if ($request->has('key_features') && is_array($request->key_features)) {
            // Delete old key features and recreate them to handle updates simply
            $product->keyFeatures()->delete();

            foreach ($request->key_features as $feature) {
                ProductKeyFeature::create([
                    'product_id' => $product->id,
                    'section_title' => $feature['section_title'] ?? null,
                    'feature_name' => $feature['feature_name'] ?? $feature['title'], // Support 'title' key or 'feature_name' key
                    'value' => $feature['value'],
                    'status' => 1,
                    'log_status' => 1,
                ]);
            }
        }

        if ($request->has('sections') && is_array($request->sections)) {
            // Delete old sections and their fields
            $product->sections()->each(function($sec) {
                $sec->fields()->delete();
                $sec->delete();
            });

            foreach ($request->sections as $s_index => $sectionData) {
                $section = \App\Modules\Product\Models\ProductSection::create([
                    'product_id' => $product->id,
                    'title' => $sectionData['title'],
                    'order_index' => $sectionData['order_index'] ?? $s_index,
                    'status' => 1,
                    'log_status' => 1,
                ]);

                if (isset($sectionData['fields']) && is_array($sectionData['fields'])) {
                    foreach ($sectionData['fields'] as $f_index => $fieldData) {
                        $filePath = null;
                        
                        if ($request->hasFile("sections.{$s_index}.fields.{$f_index}.file")) {
                            $file = $request->file("sections.{$s_index}.fields.{$f_index}.file");
                            $ext = $file->getClientOriginalExtension() ?: 'bin';
                            $fileName = time() . '_sec_' . uniqid() . '.' . $ext;
                            $file->move(public_path('uploads/product_sections'), $fileName);
                            $filePath = 'uploads/product_sections/' . $fileName;
                        }

                        \App\Modules\Product\Models\ProductSectionField::create([
                            'product_id' => $product->id,
                            'product_section_id' => $section->id,
                            'field_type' => $fieldData['field_type'],
                            'field_label' => $fieldData['field_label'] ?? null,
                            'field_value' => $fieldData['field_value'] ?? null,
                            'file_path' => $filePath,
                            'order_index' => $fieldData['order_index'] ?? $f_index,
                            'status' => 1,
                            'log_status' => 1,
                        ]);
                    }
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Product updated successfully',
            'data' => $product->load(['keyFeatures', 'images', 'sections.fields'])
        ], 200);
    }

    public function delete_product($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $product->update(['log_status' => 0]);
        $product->delete();

        foreach ($product->keyFeatures as $feature) {
            $feature->update(['log_status' => 0]);
            $feature->delete();
        }

        foreach ($product->images as $image) {
            $image->update(['log_status' => 0]);
            $image->delete();
        }

        return response()->json([
            'status' => true,
            'message' => 'Product deleted successfully'
        ], 200);
    }

    public function delete_product_image($id)
    {
        $image = ProductImage::find($id);
        if (!$image) {
            return response()->json([
                'status' => false,
                'message' => 'Product Image not found'
            ], 404);
        }

        $image->update(['log_status' => 0]);
        $image->delete();

        return response()->json([
            'status' => true,
            'message' => 'Product Image deleted successfully'
        ], 200);
    }

    // --- PRODUCT ENQUIRY CRUD ---

    public function index_product_enquiry()
    {
        $enquiries = ProductEnquiry::with(['product.keyFeatures', 'product.images', 'product.subcategory.divisions', 'followups' => function($query) {
            $query->latest('id');
        }])->latest()->get();

        return response()->json([
            'status' => true,
            'message' => 'Product Enquiries retrieved successfully',
            'data' => $enquiries
        ], 200);
    }

    public function show_product_enquiry($id)
    {
        $enquiry = ProductEnquiry::with(['product.keyFeatures', 'product.images', 'product.subcategory.divisions', 'followups' => function($query) {
            $query->latest('id');
        }])->find($id);
        if (!$enquiry) {
            return response()->json([
                'status' => false,
                'message' => 'Product Enquiry not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Product Enquiry retrieved successfully',
            'data' => $enquiry
        ], 200);
    }

    public function update_product_enquiry(Request $request, $id)
    {
        $enquiry = ProductEnquiry::find($id);

        if (!$enquiry) {
            return response()->json([
                'status' => false,
                'message' => 'Product Enquiry not found'
            ], 404);
        }

        if ($request->has('followup_date') && !$request->has('followupdate')) {
            $request->merge(['followupdate' => $request->followup_date]);
        } elseif ($request->has('current_followup_date') && !$request->has('followupdate')) {
            $request->merge(['followupdate' => $request->current_followup_date]);
        }

        $request->validate([
            'log_status' => 'nullable|integer',
            'followupdate' => 'nullable|date',
            'status' => 'nullable',
            'remarks' => 'nullable',
            'convert' => 'nullable|integer',
        ]);

        $updateData = $request->only([
            'further_customization', 'name', 'phone_number', 'email', 'topic', 'message', 'convert'
        ]);
        
        if ($request->has('log_status')) {
            $updateData['log_status'] = $request->log_status;
        }

        $enquiry->update($updateData);

        if ($request->has('followupdate')) {
            $enquiry->update(['current_followup_date' => $request->followupdate]);
        }

        if ($request->filled('followupdate') || $request->filled('remarks') || $request->filled('status')) {
            $latestFollowup = \App\Modules\Product\Models\ProductEnquiryFollowup::where('product_enquiry_id', $enquiry->id)->latest()->first();
            
            \App\Modules\Product\Models\ProductEnquiryFollowup::create([
                'product_enquiry_id' => $enquiry->id,
                'followupdate' => $request->followupdate ?? ($latestFollowup ? $latestFollowup->followupdate : now()->format('Y-m-d')),
                'remarks' => $request->remarks ?? '',
                'status' => $request->status ?? ($latestFollowup ? $latestFollowup->status : 'Open'),
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'Product Enquiry updated successfully',
            'data' => $enquiry->load(['product.keyFeatures', 'product.images', 'product.subcategory.divisions', 'followups'])
        ]);
    }
}