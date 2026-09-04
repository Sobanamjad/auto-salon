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
        $imagePath = null;

        // Handle file upload
        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $path = $file->store('partner_images', 'public');
            $imagePath = $path;
        }

        Partner::create([
            'language' => $request->language,
            'status' => $request->boolean('status', false),
            'show_on_home' => $request->boolean('show_on_home', false),
            'sort_order' => $request->sort_order ?? 99,
            'name' => $request->name,
            'city' => $request->city,
            'district' => $request->district,
            'village' => $request->village,
            'brief' => $request->brief,
            'content' => $request->content,
            'note' => $request->note,
            'image' => $imagePath,
            'slogan' => $request->slogan,
            'tag' => $request->tag,
            'external_link' => $request->external_link,
            'company_name' => $request->company_name,
            'booking_link' => $request->booking_link,
            'take_number_link' => $request->take_number_link,
            'current_number_link' => $request->current_number_link,
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
        $imagePath = $partner->image;

        // Handle file upload
        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $path = $file->store('partner_images', 'public');
            $imagePath = $path;
        }

        $partner->update([
            'language' => $request->language,
            'status' => $request->boolean('status', false),
            'show_on_home' => $request->boolean('show_on_home', false),
            'sort_order' => $request->sort_order ?? 99,
            'name' => $request->name,
            'city' => $request->city,
            'district' => $request->district,
            'village' => $request->village,
            'brief' => $request->brief,
            'content' => $request->content,
            'note' => $request->note,
            'image' => $imagePath,
            'slogan' => $request->slogan,
            'tag' => $request->tag,
            'external_link' => $request->external_link,
            'company_name' => $request->company_name,
            'booking_link' => $request->booking_link,
            'take_number_link' => $request->take_number_link,
            'current_number_link' => $request->current_number_link,
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

    public function getPublicPartners()
    {
        $partners = Partner::active()
                          ->ordered()
                          ->get([
                              'id',
                              'name',
                              'city',
                              'district',
                              'village',
                              'brief',
                              'content',
                              'image',
                              'slogan',
                              'tag',
                              'external_link',
                              'company_name',
                              'booking_link',
                              'take_number_link',
                              'current_number_link',
                              'views'
                          ]);

        return response()->json([
            'partners' => $partners
        ]);
    }
}