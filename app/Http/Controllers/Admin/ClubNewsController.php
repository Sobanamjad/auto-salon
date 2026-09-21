<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClubNewsRequest;
use App\Models\ClubNews;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClubNewsController extends Controller
{
    public function index()
    {
        $news = ClubNews::active()->ordered()->get();

        return Inertia::render('Admin/club-news/ClubNews', [
            'title' => '社團新聞',
            'news' => $news
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/club-news/ClubNewsCreate', [
            'title' => '新增社團新聞'
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sn' => 'required|string|unique:club_news,sn',
            'language' => 'required|string|max:2',
            'title' => 'required|string|max:255',
            'img' => 'nullable|string',
            'img_w' => 'nullable|integer',
            'img_h' => 'nullable|integer',
            'date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'excerpt' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'village' => 'nullable|string|max:255',
            'source' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'is_excluded' => 'boolean',
        ]);

        ClubNews::create($validated);

        return redirect()->route('admin.club-news.index')
                         ->with('success', '新聞新增成功');
    }

    public function edit($id)
    {
        $news = ClubNews::findOrFail($id);

        return Inertia::render('Admin/club-news/ClubNewsEdit', [
            'title' => '編輯社團新聞',
            'news' => $news
        ]);
    }

    public function update(Request $request, $id)
    {
        $news = ClubNews::findOrFail($id);

        $validated = $request->validate([
            'sn' => 'required|string|unique:club_news,sn,' . $id,
            'language' => 'required|string|max:2',
            'title' => 'required|string|max:255',
            'img' => 'nullable|string',
            'img_w' => 'nullable|integer',
            'img_h' => 'nullable|integer',
            'date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'excerpt' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'village' => 'nullable|string|max:255',
            'source' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'is_excluded' => 'boolean',
        ]);

        $news->update($validated);

        return redirect()->route('admin.club-news.index')
                         ->with('success', '新聞更新成功');
    }

    public function exclude()
    {
        // Get all excluded topics/categories
        $excludedTopics = ClubNews::excluded()->get();

        return Inertia::render('Admin/club-news/ClubNewsExclude', [
            'title' => '排除的主題',
            'excludedTopics' => $excludedTopics
        ]);
    }

    public function storeExcluded(Request $request)
    {
        $validated = $request->validate([
            'chk_sn' => 'array',
            'chk_sn.*' => 'string',
        ]);

        // Save excluded topics logic here
        // This is for the "排除的主題" feature

        return redirect()->route('admin.club-news.index')
                         ->with('success', '排除主題已更新');
    }

    public function destroy($id)
    {
        $news = ClubNews::findOrFail($id);
        $news->delete();

        return redirect()->route('admin.club-news.index')
                         ->with('success', '新聞刪除成功');
    }

    public function toggleExclude($id)
    {
        $news = ClubNews::findOrFail($id);
        $news->update(['is_excluded' => !$news->is_excluded]);

        return redirect()->back()->with('success', '狀態已更新');
    }

    public function detail($id)
    {
        $news = ClubNews::findOrFail($id);

        // Increment views
        $news->increment('views');

        return Inertia::render('Admin/club-news/ClubNewsDetail', [
            'news' => $news
        ]);
    }
}