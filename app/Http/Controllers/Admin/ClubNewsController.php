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