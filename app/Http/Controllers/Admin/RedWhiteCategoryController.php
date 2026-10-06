<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RedWhiteCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RedWhiteCategoryController extends Controller
{
    public function index()
    {
        $categories = RedWhiteCategory::ordered()->get();

        return Inertia::render('Admin/red-white/RedWhiteCategoryList', [
            'title'      => '紅白帖分類',
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/red-white/RedWhiteCategoryForm', [
            'title' => '新增紅白帖分類',
            'item'  => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:50|unique:red_white_categories,name',
            'icon'       => 'nullable|string|max:10',
            'color'      => 'nullable|string|max:100',
            'sort_order' => 'integer|min:0',
        ], [
            'name.required' => '請輸入分類名稱',
            'name.unique'   => '此分類名稱已存在',
        ]);

        RedWhiteCategory::create([
            'name'       => $validated['name'],
            'icon'       => $validated['icon']       ?? '📋',
            'color'      => $validated['color']      ?? 'bg-blue-100 text-blue-800',
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return redirect()->route('admin.red-white-categories.index')
                         ->with('success', '分類新增成功！');
    }

    public function edit($id)
    {
        $item = RedWhiteCategory::findOrFail($id);

        return Inertia::render('Admin/red-white/RedWhiteCategoryForm', [
            'title' => '編輯紅白帖分類',
            'item'  => $item,
        ]);
    }

    public function update(Request $request, $id)
    {
        $item = RedWhiteCategory::findOrFail($id);

        $validated = $request->validate([
            'name'       => 'required|string|max:50|unique:red_white_categories,name,' . $id,
            'icon'       => 'nullable|string|max:10',
            'color'      => 'nullable|string|max:100',
            'sort_order' => 'integer|min:0',
        ], [
            'name.required' => '請輸入分類名稱',
            'name.unique'   => '此分類名稱已存在',
        ]);

        $item->update($validated);

        return redirect()->route('admin.red-white-categories.index')
                         ->with('success', '分類更新成功！');
    }

    public function destroy($id)
    {
        $item = RedWhiteCategory::findOrFail($id);
        $item->delete();

        return redirect()->route('admin.red-white-categories.index')
                         ->with('success', '分類刪除成功！');
    }

    public function updateSort($id)
    {
        $item = RedWhiteCategory::findOrFail($id);
        $item->update(['sort_order' => (int) request('sort_order', 0)]);

        return redirect()->back()->with('success', '排序已更新！');
    }
}
