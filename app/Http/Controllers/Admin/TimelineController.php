<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TimelineRequest;
use App\Models\Timeline;
use Inertia\Inertia;

class TimelineController extends Controller
{
    public function index()
    {
        $timelines = Timeline::ordered()->get();

        return Inertia::render('Admin/timeline/Timeline', [
            'title' => '本會記事',
            'timelines' => $timelines
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/timeline/TimelineCreate', [
            'title' => '新增記事'
        ]);
    }

    public function store(TimelineRequest $request)
    {
        $validated = $request->validated();

        Timeline::create([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order' => $validated['sort_order'],
            'category' => $validated['category'] ?? null,
            'event_date' => $validated['event_date'] ?? now(),
            'title' => $validated['title'],
            'brief' => $validated['brief'] ?? null,
            'content' => $validated['content'] ?? null,
            'video' => $validated['video'] ?? null,
            'note' => $validated['note'] ?? null,
            'has_photo' => $validated['has_photo'] ?? false,
            'views' => 0,
        ]);

        return redirect()->route('admin.timeline.index')
                         ->with('success', '記事新增成功');
    }

    public function edit($id)
    {
        $timeline = Timeline::findOrFail($id);

        return Inertia::render('Admin/timeline/TimelineEdit', [
            'title' => '編輯記事',
            'timeline' => $timeline
        ]);
    }

    public function update(TimelineRequest $request, $id)
    {
        $timeline = Timeline::findOrFail($id);
        $validated = $request->validated();

        $timeline->update([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order' => $validated['sort_order'],
            'category' => $validated['category'] ?? null,
            'event_date' => $validated['event_date'] ?? now(),
            'title' => $validated['title'],
            'brief' => $validated['brief'] ?? null,
            'content' => $validated['content'] ?? null,
            'video' => $validated['video'] ?? null,
            'note' => $validated['note'] ?? null,
            'has_photo' => $validated['has_photo'] ?? false,
        ]);

        return redirect()->route('admin.timeline.index')
                         ->with('success', '記事更新成功');
    }

    public function destroy($id)
    {
        $timeline = Timeline::findOrFail($id);
        $timeline->delete();

        return redirect()->route('admin.timeline.index')
                         ->with('success', '記事刪除成功');
    }

    public function toggleHome($id)
    {
        $timeline = Timeline::findOrFail($id);
        $timeline->update(['show_on_home' => !$timeline->show_on_home]);

        return redirect()->back()->with('success', '首頁顯示狀態已更新');
    }

    public function resetViews($id)
    {
        $timeline = Timeline::findOrFail($id);
        $timeline->update(['views' => 0]);

        return redirect()->back()->with('success', '點閱數已清除');
    }

    public function updateSort($id)
    {
        $timeline = Timeline::findOrFail($id);
        $timeline->update(['sort_order' => request('sort_order')]);

        return redirect()->back()->with('success', '排序已更新');
    }
}