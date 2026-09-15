<?php

namespace App\Modules\Tnai\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tnai\Models\Article;
use App\Traits\ApiResponse;

class ArticleController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of public articles.
     * Only returns approved and active articles.
     */
    public function index(Request $request)
    {
        $query = Article::where('approval_status', 'approved')
                        ->where('status', 'active');

        // Sort by publication date descending by default
        $query->orderBy('publication_date', 'desc');

        return $this->success($query->get(), 'Articles retrieved successfully');
    }

    /**
     * Show a specific public article
     */
    public function show($id)
    {
        $article = Article::where('approval_status', 'approved')
                          ->where('status', 'active')
                          ->find($id);

        if (!$article) {
            return $this->error('Article not found or not published', 404);
        }

        return $this->success($article, 'Article retrieved successfully');
    }
}
