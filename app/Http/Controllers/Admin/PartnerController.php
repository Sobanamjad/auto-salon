<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PartnerRequest;
use App\Models\Partner;
use Inertia\Inertia;

class PartnerController extends Controller
{
    public function index()
    {
        $partners = Partner::ordered()->get();

        return Inertia::render('Admin/partners/Partners', [
            'title' => '夥伴介紹',
            'partners' => $partners
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/partners/PartnerCreate', [
            'title' => '新增夥伴'
        ]);
    }

    public function store(PartnerRequest $request)
    {
        $validated = $request->validated();

        Partner::create([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order' => $validated['sort_order'],
            'name' => $validated['name'],
            'city' => $validated['city'] ?? null,
            'district' => $validated['district'] ?? null,
            'village' => $validated['village'] ?? null,
            'brief' => $validated['brief'] ?? null,
            'content' => $validated['content'] ?? null,
            'note' => $validated['note'] ?? null,
            'views' => 0,
        ]);

        return redirect()->route('admin.partners.index')
                         ->with('success', '夥伴新增成功');
    }

    public function edit($id)
    {
        $partner = Partner::findOrFail($id);

        return Inertia::render('Admin/partners/PartnerEdit', [
            'title' => '編輯夥伴',
            'partner' => $partner
        ]);
    }

    public function update(PartnerRequest $request, $id)
    {
        $partner = Partner::findOrFail($id);
        $validated = $request->validated();

        $partner->update([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order' => $validated['sort_order'],
            'name' => $validated['name'],
            'city' => $validated['city'] ?? null,
            'district' => $validated['district'] ?? null,
            'village' => $validated['village'] ?? null,
            'brief' => $validated['brief'] ?? null,
            'content' => $validated['content'] ?? null,
            'note' => $validated['note'] ?? null,
        ]);

        return redirect()->route('admin.partners.index')
                         ->with('success', '夥伴更新成功');
    }

    public function destroy($id)
    {
        $partner = Partner::findOrFail($id);
        $partner->delete();

        return redirect()->route('admin.partners.index')
                         ->with('success', '夥伴刪除成功');
    }

    public function toggleHome($id)
    {
        $partner = Partner::findOrFail($id);
        $partner->update(['show_on_home' => !$partner->show_on_home]);

        return redirect()->back()->with('success', '首頁顯示狀態已更新');
    }

    public function toggleStatus($id)
    {
        $partner = Partner::findOrFail($id);
        $partner->update(['status' => !$partner->status]);

        return redirect()->back()->with('success', '狀態已更新');
    }

    public function resetViews($id)
    {
        $partner = Partner::findOrFail($id);
        $partner->update(['views' => 0]);

        return redirect()->back()->with('success', '點閱數已清除');
    }

    public function updateSort($id)
    {
        $partner = Partner::findOrFail($id);
        $partner->update(['sort_order' => request('sort_order')]);

        return redirect()->back()->with('success', '排序已更新');
    }
}