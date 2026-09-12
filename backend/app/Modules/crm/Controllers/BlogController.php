<?php

namespace App\Modules\crm\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\crm\Models\Blog;
use App\Modules\crm\Models\BlogImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class BlogController extends Controller
{
    /**
     * Store a newly created blog in storage.
     */
    public function index()
    {
        $blogs = Blog::where('log_status', 1)->get();

        return response()->json([
            'status' => true,
            'message' => 'Blogs retrieved successfully',
            'data' => $blogs->load('images')
        ], 200);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'author_name' => 'nullable|string|max:255',
            'blog_title' => 'required|string|max:255',
            'short_description' => 'nullable|string',
            'blog_description' => 'required|string',
            'blog_image' => ['nullable', $this->imageValidationRule(5120, 'blog image')],
            'additional_images' => 'nullable|array',
            'additional_images.*' => ['nullable', $this->imageValidationRule(3072, 'additional image')],
            'log_status' => 'nullable|integer|in:0,1',
            'status' => 'required|integer|in:0,1',
            'type' => 'string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $imagePath = null;
        if ($request->hasFile('blog_image')) {
            $image = $request->file('blog_image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/blogs'), $imageName);
            $imagePath = 'uploads/blogs/' . $imageName;
        } elseif ($request->filled('blog_image') && is_string($request->blog_image)) {
            $imagePath = $this->saveBase64Image($request->blog_image, 'uploads/blogs');
        }

        $blog = Blog::create([
            'author_name' => $request->author_name,
            'blog_title' => $request->blog_title,
            'short_description' => $request->short_description,
            'blog_description' => $request->blog_description,
            'blog_image' => $imagePath,
            'log_status' => $request->log_status ?? 1,
            'status' => $request->status ?? 1,
            'type' => $request->type,
        ]);

        $additionalImages = $request->hasFile('additional_images') ? $request->file('additional_images') : ($request->input('additional_images') ?? []);
        
        if (!empty($additionalImages)) {
            foreach ($additionalImages as $image) {
                if ($image instanceof \Illuminate\Http\UploadedFile) {
                    $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                    $image->move(public_path('uploads/blogs/additional'), $imageName);
                    BlogImage::create([
                        'blog_id' => $blog->id,
                        'image_path' => 'uploads/blogs/additional/' . $imageName,
                    ]);
                } elseif (is_string($image)) {
                    $savedPath = $this->saveBase64Image($image, 'uploads/blogs/additional');
                    if ($savedPath) {
                        BlogImage::create([
                            'blog_id' => $blog->id,
                            'image_path' => $savedPath,
                        ]);
                    }
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Blog created successfully',
            'data' => $blog->load('images')
        ], 201);
    }
    public function show($id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json([
                'status' => false,
                'message' => 'Blog not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Blog retrieved successfully',
            'data' => $blog->load('images')
        ], 200);

    }
    public function update(Request $request, $id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json([
                'status' => false,
                'message' => 'Blog not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'author_name' => 'nullable|string|max:255',
            'blog_title' => 'required|string|max:255',
            'short_description' => 'nullable|string',
            'blog_description' => 'required|string',
            'blog_image' => ['nullable', $this->imageValidationRule(5120, 'blog image')],
            'additional_images' => 'nullable|array',
            'additional_images.*' => ['nullable', $this->imageValidationRule(3072, 'additional image')],
            'log_status' => 'nullable|integer|in:0,1',
            'status' => 'nullable|integer|in:0,1',
            'type' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->hasFile('blog_image') || ($request->filled('blog_image') && is_string($request->blog_image))) {
            if ($blog->blog_image && file_exists(public_path($blog->blog_image))) {
                unlink(public_path($blog->blog_image));
            }

            if ($request->hasFile('blog_image')) {
                $image = $request->file('blog_image');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/blogs'), $imageName);
                $blog->blog_image = 'uploads/blogs/' . $imageName;
            } else {
                $blog->blog_image = $this->saveBase64Image($request->blog_image, 'uploads/blogs');
            }
        }

        $blog->author_name = $request->author_name;
        $blog->blog_title = $request->blog_title;
        $blog->short_description = $request->short_description;
        $blog->blog_description = $request->blog_description;
        $blog->log_status = $request->log_status ?? 1;
        $blog->status = $request->status ?? 1;
        $blog->type = $request->type;

        $blog->save();

        $additionalImages = $request->hasFile('additional_images') ? $request->file('additional_images') : ($request->input('additional_images') ?? []);
        
        if (!empty($additionalImages)) {
            foreach ($additionalImages as $image) {
                if ($image instanceof \Illuminate\Http\UploadedFile) {
                    $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                    $image->move(public_path('uploads/blogs/additional'), $imageName);
                    BlogImage::create([
                        'blog_id' => $blog->id,
                        'image_path' => 'uploads/blogs/additional/' . $imageName,
                    ]);
                } elseif (is_string($image)) {
                    $savedPath = $this->saveBase64Image($image, 'uploads/blogs/additional');
                    if ($savedPath) {
                        BlogImage::create([
                            'blog_id' => $blog->id,
                            'image_path' => $savedPath,
                        ]);
                    }
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Blog updated successfully',
            'data' => $blog->load('images')
        ], 200);
    }
    public function Delete($id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json([
                'status' => false,
                'message' => 'Blog not found'
            ], 404);
        }

        $blog->log_status = 0; // 0 = Deleted/Inactive
        $blog->save();

        return response()->json([
            'status' => true,
            'message' => 'Blog deleted successfully'
        ], 200);
    }

    public function deleteImage($id)
    {
        $image = BlogImage::find($id);

        if (!$image) {
            return response()->json([
                'status' => false,
                'message' => 'Image not found'
            ], 404);
        }

        $image->delete();

        return response()->json([
            'status' => true,
            'message' => 'Image deleted successfully'
        ], 200);
    }

    private function saveBase64Image($base64String, $directory)
    {
        if (preg_match('/^data:image\/(\w+);base64,/', $base64String, $type)) {
            $base64String = substr($base64String, strpos($base64String, ',') + 1);
            $type = strtolower($type[1]);

            if (in_array($type, ['jpg', 'jpeg', 'gif', 'png', 'svg', 'webp'])) {
                $decodedImage = base64_decode($base64String);
                if ($decodedImage !== false) {
                    $imageName = time() . '_' . uniqid() . '.' . $type;
                    $path = public_path($directory);
                    if (!file_exists($path)) {
                        mkdir($path, 0755, true);
                    }
                    file_put_contents($path . '/' . $imageName, $decodedImage);
                    return $directory . '/' . $imageName;
                }
            }
        }
        return null;
    }

    private function imageValidationRule($maxKb, $name)
    {
        return function ($attribute, $value, $fail) use ($maxKb, $name) {
            if ($value instanceof \Illuminate\Http\UploadedFile) {
                if (!in_array(strtolower($value->getClientOriginalExtension()), ['jpeg', 'png', 'jpg', 'gif', 'svg', 'webp'])) {
                    $fail("The {$name} must be a file of type: jpeg, png, jpg, gif, svg.");
                }
                if ($value->getSize() > $maxKb * 1024) {
                    $fail("The {$name} must not be greater than " . ($maxKb / 1024) . " MB.");
                }
            } elseif (is_string($value)) {
                if (!preg_match('/^data:image\/(jpeg|png|jpg|gif|svg|webp);base64,/', $value)) {
                    $fail("The {$name} format is invalid. Ensure it is a valid base64 image.");
                }
                // Base64 size estimation
                $sizeInBytes = (int) (strlen($value) * (3 / 4));
                if ($sizeInBytes > $maxKb * 1024) {
                    $fail("The {$name} must not be greater than " . ($maxKb / 1024) . " MB.");
                }
            }
        };
    }
}