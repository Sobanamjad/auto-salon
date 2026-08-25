<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ColumnArticleRequest;
use App\Models\ColumnArticle;
use Inertia\Inertia;

class ColumnArticleController extends Controller
{
    public function index()
    {
        $articles = ColumnArticle::ordered()->get();

        return Inertia::render('Admin/column-articles/ColumnArticleList', [
            'title' => '專欄園地',
            'articles' => $articles
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/column-articles/ColumnArticleCreate', [
            'title' => '新增專欄文章'
        ]);
    }

    public function store(ColumnArticleRequest $request)
    {
        $validated = $request->validated();

        ColumnArticle::create([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order' => $validated['sort_order'],
            'published_date' => $validated['published_date'] ?? now(),
            'end_date' => $validated['end_date'] ?? '2200-12-31',
            'category' => $validated['category'] ?? null,
            'subject' => $validated['subject'],
            'brief' => $validated['brief'] ?? null,
            'content' => $validated['content'],
            'keyword' => $validated['keyword'] ?? null,
            'video' => $validated['video'] ?? null,
            'map' => $validated['map'] ?? null,
            'note' => $validated['note'] ?? null,
            'has_photo' => $validated['has_photo'] ?? false,
            'platform_category' => $validated['platform_category'] ?? null,
            'join_platform' => $validated['join_platform'] ?? false,
            'views' => 0,
        ]);

        return redirect()->route('admin.column-articles.index')
                         ->with('success', '專欄文章新增成功');
    }

    public function edit($id)
    {
        $article = ColumnArticle::findOrFail($id);

        return Inertia::render('Admin/column-articles/ColumnArticleEdit', [
            'title' => '編輯專欄文章',
            'article' => $article
        ]);
    }

    public function update(ColumnArticleRequest $request, $id)
    {
        $article = ColumnArticle::findOrFail($id);
        
        // Handle partial updates for sort_order and views
        $requestData = $request->all();
        
        if (array_key_exists('sort_order', $requestData) && count($requestData) === 1) {
            $article->update(['sort_order' => $request->sort_order]);
            return redirect()->route('admin.column-articles.index')
                             ->with('success', '排序更新成功');
        }

        if (array_key_exists('views', $requestData) && count($requestData) === 1) {
            $article->update(['views' => $request->views]);
            return redirect()->route('admin.column-articles.index')
                             ->with('success', '點閱數清除成功');
        }

        // Full update with validation
        $validated = $request->validated();

        $article->update([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order' => $validated['sort_order'],
            'published_date' => $validated['published_date'] ?? now(),
            'end_date' => $validated['end_date'] ?? '2200-12-31',
            'category' => $validated['category'] ?? null,
            'subject' => $validated['subject'],
            'brief' => $validated['brief'] ?? null,
            'content' => $validated['content'],
            'keyword' => $validated['keyword'] ?? null,
            'video' => $validated['video'] ?? null,
            'map' => $validated['map'] ?? null,
            'note' => $validated['note'] ?? null,
            'has_photo' => $validated['has_photo'] ?? false,
            'platform_category' => $validated['platform_category'] ?? null,
            'join_platform' => $validated['join_platform'] ?? false,
        ]);

        return redirect()->route('admin.column-articles.index')
                         ->with('success', '專欄文章更新成功');
    }

    public function destroy($id)
    {
        $article = ColumnArticle::findOrFail($id);
        $article->delete();

        return redirect()->route('admin.column-articles.index')
                         ->with('success', '專欄文章刪除成功');
    }

    public function toggleHome($id)
    {
        $article = ColumnArticle::findOrFail($id);
        $article->update(['show_on_home' => !$article->show_on_home]);

        return redirect()->back()->with('success', '首頁顯示狀態已更新');
    }
}