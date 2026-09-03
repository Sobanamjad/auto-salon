<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewsRequest;
use App\Models\News;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of news items.
     */
    public function index()
    {
        $news = News::orderBy('sort_order', 'asc')
                     ->orderBy('published_date', 'desc')
                     ->get();

        return Inertia::render('Admin/news/NewsList', [
            'title' => '最新消息',
            'news' => $news
        ]);
    }

    /**
     * Show the form for creating a new news item.
     */
    public function create()
    {
        return Inertia::render('Admin/news/NewsCreate', [
            'title' => '新增最新消息'
        ]);
    }

    /**
     * Store a newly created news item in storage.
     */
    public function store(NewsRequest $request)
    {
        $validated = $request->validated();

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('news_photos', 'public');
        }

        News::create([
            'published_date' => $validated['published_date'],
            'end_date' => $validated['end_date'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'show_marquee' => $validated['show_marquee'],
            'sort_order' => $validated['sort_order'],
            'category' => $validated['category'],
            'photo' => $photoPath,
            'subject' => $validated['subject'],
            'brief' => $validated['brief'] ?? null,
            'content' => $validated['content'],
            'keyword' => $validated['keyword'] ?? null,
            'video' => $validated['video'] ?? null,
            'map' => $validated['map'] ?? null,
            'note' => $validated['note'] ?? null,
            'views' => 0,
        ]);

        return redirect()
            ->route('admin.news.index')
            ->with('success', '最新消息新增成功');
    }

    /**
     * Show the form for editing the specified news item.
     */
    public function edit($id)
    {
        $news = News::findOrFail($id);

        return Inertia::render('Admin/news/NewsEdit', [
            'title' => '編輯最新消息',
            'news' => $news
        ]);
    }

    /**
     * Update the specified news item in storage.
     */
    public function update(NewsRequest $request, $id)
    {
        $news = News::findOrFail($id);
        $validated = $request->validated();

        $photoPath = $news->photo;
        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($news->photo && Storage::disk('public')->exists($news->photo)) {
                Storage::disk('public')->delete($news->photo);
            }
            $photoPath = $request->file('photo')->store('news_photos', 'public');
        }

        $news->update([
            'published_date' => $validated['published_date'],
            'end_date' => $validated['end_date'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'show_marquee' => $validated['show_marquee'],
            'sort_order' => $validated['sort_order'],
            'category' => $validated['category'],
            'photo' => $photoPath,
            'subject' => $validated['subject'],
            'brief' => $validated['brief'] ?? null,
            'content' => $validated['content'],
            'keyword' => $validated['keyword'] ?? null,
            'video' => $validated['video'] ?? null,
            'map' => $validated['map'] ?? null,
            'note' => $validated['note'] ?? null,
        ]);

        return redirect()
            ->route('admin.news.index')
            ->with('success', '最新消息更新成功');
    }

    /**
     * Remove the specified news item from storage.
     */
    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $news->delete();

        return redirect()
            ->route('admin.news.index')
            ->with('success', '最新消息刪除成功');
    }

    /**
     * Preview the specified news item.
     */
    public function preview($id)
    {
        $news = News::findOrFail($id);

        return Inertia::render('Admin/news/NewsPreview', [
            'title' => '預覽最新消息',
            'news' => $news
        ]);
    }

    /**
     * Send SMS for the specified news item.
     */
    public function sms($id)
    {
        $news = News::findOrFail($id);

        // SMS functionality would be implemented here
        return redirect()
            ->route('admin.news.index')
            ->with('success', 'SMS發送功能尚未實作');
    }

    /**
     * Toggle show_on_home status.
     */
    public function toggleHome($id)
    {
        $news = News::findOrFail($id);
        $news->update([
            'show_on_home' => !$news->show_on_home
        ]);

        return redirect()
            ->route('admin.news.index')
            ->with('success', '首頁顯示狀態已更新');
    }

    /**
     * Toggle show_marquee status.
     */
    public function toggleMarquee($id)
    {
        $news = News::findOrFail($id);
        $news->update([
            'show_marquee' => !$news->show_marquee
        ]);

        return redirect()
            ->route('admin.news.index')
            ->with('success', '跑馬燈顯示狀態已更新');
    }
}
