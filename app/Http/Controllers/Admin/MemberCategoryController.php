<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MemberCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberCategoryController extends Controller
{
    public function index()
    {
        $categories = MemberCategory::ordered()->get();

        return Inertia::render('Admin/member-categories/MemberCategoryList', [
            'title'      => '會員分類',
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/member-categories/MemberCategoryForm', [
            'title' => '新增會員分類',
            'item'  => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:100|unique:member_categories,name',
            'name2'      => 'nullable|string|max:100',
            'icon'       => 'nullable|string|max:10',
            'color'      => 'nullable|string|max:100',
            'sort_order' => 'integer|min:0',
            'is_active'  => 'boolean',
        ], [
            'name.required' => '請輸入分類名稱',
            'name.unique'   => '此分類名稱已存在',
        ]);

        MemberCategory::create([
            'name'       => $validated['name'],
            'name2'      => $validated['name2']      ?? null,
            'icon'       => $validated['icon']       ?? '👤',
            'color'      => $validated['color']      ?? 'bg-blue-100 text-blue-800',
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active'  => $validated['is_active']  ?? true,
        ]);

        return redirect()->route('admin.member-categories.index')
                         ->with('success', '分類新增成功！');
    }

    public function edit($id)
    {
        $item = MemberCategory::findOrFail($id);

        return Inertia::render('Admin/member-categories/MemberCategoryForm', [
            'title' => '編輯會員分類',
            'item'  => $item,
        ]);
    }

    public function update(Request $request, $id)
    {
        $item = MemberCategory::findOrFail($id);

        $validated = $request->validate([
            'name'       => 'required|string|max:100|unique:member_categories,name,' . $id,
            'name2'      => 'nullable|string|max:100',
            'icon'       => 'nullable|string|max:10',
            'color'      => 'nullable|string|max:100',
            'sort_order' => 'integer|min:0',
            'is_active'  => 'boolean',
        ], [
            'name.required' => '請輸入分類名稱',
            'name.unique'   => '此分類名稱已存在',
        ]);

        $item->update($validated);

        return redirect()->route('admin.member-categories.index')
                         ->with('success', '分類更新成功！');
    }

    public function destroy($id)
    {
        $item = MemberCategory::findOrFail($id);
        $item->delete();

        return redirect()->route('admin.member-categories.index')
                         ->with('success', '分類刪除成功！');
    }

    public function updateSort($id)
    {
        $item = MemberCategory::findOrFail($id);
        $item->update(['sort_order' => (int) request('sort_order', 0)]);

        return redirect()->back()->with('success', '排序已更新！');
    }

    public function toggleActive($id)
    {
        $item = MemberCategory::findOrFail($id);
        $item->update(['is_active' => !$item->is_active]);

        return redirect()->back()->with('success', '狀態已更新！');
    }
}
