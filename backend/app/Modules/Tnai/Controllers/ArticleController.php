<?php

namespace App\Modules\Tnai\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Tnai\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponse;

class ArticleController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $approvalStatus = $request->query('approval_status');
        $recordStatus = $request->query('status');
        
        $query = Article::with(['submittedBy', 'reviewedBy']);
        
        if ($recordStatus) {
            $query->where('status', $recordStatus);
        } else {
            $query->where('status', 'active');
        }
        
        if ($approvalStatus) {
            $query->where('approval_status', strtolower($approvalStatus));
        } else {
            $query->where('approval_status', '!=', 'draft');
        }

        return $this->success($query->get(), 'Articles retrieved successfully');
    }

    /**
     * Store a newly created resource in storage (Maker).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'author_name' => 'required|string|max:255',
            'author_designation' => 'sometimes|required|string|max:255', // Legacy frontend support
            'semester_of_study' => 'sometimes|required|string|max:255', // New DB field
            'author_institution' => 'required|string|max:255',
            'article_category' => 'required|string|max:255',
            'featured_image' => 'nullable|string', // Relaxed for testing
            'short_description' => 'required|string',
            'article_content' => 'required|string',
            'publication_date' => 'required|date',
            'attachment' => 'required|string', // Relaxed for testing
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'display_order' => 'nullable|integer',
            'status' => 'required|in:active,inactive,Active,Inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();
        
        // Handle frontend payload still sending author_designation
        if (isset($data['author_designation'])) {
            $data['semester_of_study'] = $data['author_designation'];
            unset($data['author_designation']);
        }

        if (isset($data['status'])) {
            $data['status'] = strtolower($data['status']);
        }

        // Handle File Uploads (when moved to form-data)
        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('articles/images', 'public');
        }
        if ($request->hasFile('attachment')) {
            $data['attachment'] = $request->file('attachment')->store('articles/attachments', 'public');
        }

        $data['submitted_by'] = $request->user()?->id;
        $data['approval_status'] = (isset($data['status']) && strtolower($data['status']) === 'active') ? 'pending' : 'draft';

        $article = Article::create($data);

        return $this->success($article, 'Article created as Draft successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $article = Article::with(['submittedBy', 'reviewedBy'])->find($id);
        if (!$article) return $this->error('Article not found', 404);

        return $this->success($article, 'Article retrieved successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $article = Article::find($id);
        if (!$article) return $this->error('Article not found', 404);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'author_name' => 'sometimes|required|string|max:255',
            'author_designation' => 'sometimes|required|string|max:255',
            'semester_of_study' => 'sometimes|required|string|max:255',
            'author_institution' => 'sometimes|required|string|max:255',
            'article_category' => 'sometimes|required|string|max:255',
            'featured_image' => 'nullable|string',
            'short_description' => 'sometimes|required|string',
            'article_content' => 'sometimes|required|string',
            'publication_date' => 'sometimes|required|date',
            'attachment' => 'sometimes|required|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'display_order' => 'nullable|integer',
            'status' => 'sometimes|required|in:active,inactive,Active,Inactive',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $data = $request->all();
        
        // Handle frontend payload still sending author_designation
        if (isset($data['author_designation'])) {
            $data['semester_of_study'] = $data['author_designation'];
            unset($data['author_designation']);
        }

        if (isset($data['status'])) {
            $data['status'] = strtolower($data['status']);
        }

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('articles/images', 'public');
        }
        if ($request->hasFile('attachment')) {
            $data['attachment'] = $request->file('attachment')->store('articles/attachments', 'public');
        }

        // Revert to draft upon update
        $data['approval_status'] = (isset($data['status']) && strtolower($data['status']) === 'active') ? 'pending' : 'draft';
        $data['submitted_by'] = $request->user()?->id;

        $article->update($data);

        return $this->success($article, 'Article updated and reverted to Draft');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $article = Article::find($id);
        if (!$article) return $this->error('Article not found', 404);

        $article->delete();

        return $this->success(null, 'Article deleted successfully');
    }

    /**
     * Submit for Approval (Maker)
     */
    public function submitForApproval(Request $request, $id)
    {
        $article = Article::find($id);
        if (!$article) return $this->error('Article not found', 404);

        if (!in_array($article->approval_status, ['draft', 'rework'])) {
            return $this->error('Only drafts or reworked records can be submitted for approval.', 400);
        }

        $article->update([
            'approval_status' => 'pending',
            'submitted_date' => now(),
            'submitted_by' => $request->user()?->id ?? $article->submitted_by
        ]);

        return $this->success($article, 'Article submitted for approval successfully');
    }

    /**
     * Approve (Checker)
     */
    public function approve(Request $request, $id)
    {
        $article = Article::find($id);
        if (!$article) return $this->error('Article not found', 404);

        $article->update([
            'approval_status' => 'approved',
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now(),
            'published_date' => now(),
            'admin_remarks' => $request->admin_remarks
        ]);

        return $this->success($article, 'Article approved successfully');
    }

    /**
     * Reject or Rework (Checker)
     */
    public function reject(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'rejection_reason' => 'required|string',
            ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $article = Article::find($id);
        if (!$article) return $this->error('Article not found', 404);

        $status = $request->input('approval_status', $request->input('type', 'rejected'));
        if ($status !== 'rework') $status = 'rejected';

        $article->update([
            'approval_status' => $status,
            'rejection_reason' => $request->rejection_reason,
            'reviewed_by' => $request->user()?->id,
            'reviewed_date' => now()
        ]);

        return $this->success($article, "Article marked as $status successfully");
    }
}
