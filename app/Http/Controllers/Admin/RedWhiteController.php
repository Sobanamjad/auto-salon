<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RedWhiteRequest;
use App\Models\RedWhite;
use App\Models\RedWhiteCategory;
use Inertia\Inertia;

class RedWhiteController extends Controller
{
    public function index()
    {
        $selTitle    = request('sel_title');
        $selDate     = request('sel_issuedate');
        $selCategory = request('sel_csn');

        $query = RedWhite::ordered();

        if ($selTitle) {
            $query->where('person_name', 'LIKE', "%{$selTitle}%");
        }

        if ($selDate) {
            $query->where('event_date_start', '<=', $selDate)
                  ->where('event_date_end', '>=', $selDate);
        }

        if ($selCategory) {
            $query->where('category', $selCategory);
        }

        $redWhite   = $query->paginate(20)->withQueryString();
        $categories = RedWhiteCategory::ordered()->get(['id', 'name', 'color', 'icon']);

        return Inertia::render('Admin/red-white/RedWhite', [
            'title'      => '紅白帖',
            'data'       => $redWhite,
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        $categories = RedWhiteCategory::ordered()->get(['id', 'name', 'color', 'icon']);

        return Inertia::render('Admin/red-white/RedWhiteForm', [
            'title'      => '新增紅白帖',
            'item'       => null,
            'categories' => $categories,
        ]);
    }

    public function store(RedWhiteRequest $request)
    {
        RedWhite::create($request->validated());

        return redirect()->route('admin.red-white.index')
                         ->with('success', '紅白帖新增成功！');
    }

    public function edit($id)
    {
        $item       = RedWhite::findOrFail($id);
        $categories = RedWhiteCategory::ordered()->get(['id', 'name', 'color', 'icon']);

        return Inertia::render('Admin/red-white/RedWhiteForm', [
            'title'      => '編輯紅白帖',
            'item'       => $item,
            'categories' => $categories,
        ]);
    }

    public function update(RedWhiteRequest $request, $id)
    {
        $item = RedWhite::findOrFail($id);
        $item->update($request->validated());

        return redirect()->route('admin.red-white.index')
                         ->with('success', '紅白帖更新成功！');
    }

    public function destroy($id)
    {
        $item = RedWhite::findOrFail($id);
        $item->delete();

        return redirect()->route('admin.red-white.index')
                         ->with('success', '紅白帖刪除成功！');
    }

    public function toggleClose($id)
    {
        $item = RedWhite::findOrFail($id);
        $item->update(['is_closed' => !$item->is_closed]);

        return redirect()->back()->with('success', '狀態已更新！');
    }

    public function updateSort($id)
    {
        $item = RedWhite::findOrFail($id);
        $item->update(['sort_order' => (int) request('sort_order', 0)]);

        return redirect()->back()->with('success', '排序已更新！');
    }
}