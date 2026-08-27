<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\LinkRequest;
use App\Models\Link;
use Inertia\Inertia;

class LinkController extends Controller
{
    public function index()
    {
        $links = Link::ordered()->get();

        return Inertia::render('Admin/links/Links', [
            'title' => '相關連結',
            'links' => $links
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/links/LinkCreate', [
            'title' => '新增連結'
        ]);
    }

    public function store(LinkRequest $request)
    {
        $validated = $request->validated();

        Link::create([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'show_on_sidebar' => $validated['show_on_sidebar'],
            'sort_order' => $validated['sort_order'],
            'category' => $validated['category'] ?? null,
            'title' => $validated['title'],
            'url' => $validated['url'] ?? null,
            'content' => $validated['content'] ?? null,
            'note' => $validated['note'] ?? null,
            'has_photo' => $validated['has_photo'] ?? false,
        ]);

        return redirect()->route('admin.links.index')
                         ->with('success', '連結新增成功');
    }

    public function edit($id)
    {
        $link = Link::findOrFail($id);

        return Inertia::render('Admin/links/LinkEdit', [
            'title' => '編輯連結',
            'link' => $link
        ]);
    }

    public function update(LinkRequest $request, $id)
    {
        $link = Link::findOrFail($id);
        $validated = $request->validated();

        $link->update([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'show_on_sidebar' => $validated['show_on_sidebar'],
            'sort_order' => $validated['sort_order'],
            'category' => $validated['category'] ?? null,
            'title' => $validated['title'],
            'url' => $validated['url'] ?? null,
            'content' => $validated['content'] ?? null,
            'note' => $validated['note'] ?? null,
            'has_photo' => $validated['has_photo'] ?? false,
        ]);

        return redirect()->route('admin.links.index')
                         ->with('success', '連結更新成功');
    }

    public function destroy($id)
    {
        $link = Link::findOrFail($id);
        $link->delete();

        return redirect()->route('admin.links.index')
                         ->with('success', '連結刪除成功');
    }

    public function toggleHome($id)
    {
        $link = Link::findOrFail($id);
        $link->update(['show_on_home' => !$link->show_on_home]);

        return redirect()->back()->with('success', '首頁顯示狀態已更新');
    }

    public function toggleSidebar($id)
    {
        $link = Link::findOrFail($id);
        $link->update(['show_on_sidebar' => !$link->show_on_sidebar]);

        return redirect()->back()->with('success', '側邊顯示狀態已更新');
    }

    public function updateSort($id)
    {
        $link = Link::findOrFail($id);
        $link->update(['sort_order' => request('sort_order')]);

        return redirect()->back()->with('success', '排序已更新');
    }

    public function copy($id)
    {
        $link = Link::findOrFail($id);
        $newLink = $link->replicate();
        $newLink->title = $link->title . ' (複製)';
        $newLink->save();

        return redirect()->route('admin.links.index')
                         ->with('success', '連結複製成功');
    }
}