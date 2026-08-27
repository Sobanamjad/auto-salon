<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GuestbookRequest;
use App\Models\Guestbook;
use Inertia\Inertia;

class GuestbookController extends Controller
{
    public function index()
    {
        $guestbooks = Guestbook::ordered()->get();

        return Inertia::render('Admin/guestbook/Guestbook', [
            'title' => '留言板',
            'guestbooks' => $guestbooks
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/guestbook/GuestbookCreate', [
            'title' => '新增留言'
        ]);
    }

    public function store(GuestbookRequest $request)
    {
        $validated = $request->validated();

        Guestbook::create([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'sort_order' => $validated['sort_order'],
            'published_date' => $validated['published_date'] ?? now(),
            'end_date' => $validated['end_date'] ?? '2200-12-31',
            'category' => $validated['category'] ?? null,
            'question' => $validated['question'],
            'brief' => $validated['brief'] ?? null,
            'answer' => $validated['answer'] ?? null,
            'question_date' => $validated['question_date'] ?? null,
            'answer_date' => $validated['answer_date'] ?? null,
            'asker_name' => $validated['asker_name'] ?? null,
            'asker_company' => $validated['asker_company'] ?? null,
            'asker_mobile' => $validated['asker_mobile'] ?? null,
            'asker_phone' => $validated['asker_phone'] ?? null,
            'asker_fax' => $validated['asker_fax'] ?? null,
            'asker_email' => $validated['asker_email'] ?? null,
            'asker_line' => $validated['asker_line'] ?? null,
            'asker_wechat' => $validated['asker_wechat'] ?? null,
            'asker_whatsapp' => $validated['asker_whatsapp'] ?? null,
            'asker_country' => $validated['asker_country'] ?? null,
            'asker_note' => $validated['asker_note'] ?? null,
            'note' => $validated['note'] ?? null,
            'has_photo' => $validated['has_photo'] ?? false,
            'views' => 0,
        ]);

        return redirect()->route('admin.guestbook.index')
                         ->with('success', '留言新增成功');
    }

    public function edit($id)
    {
        $guestbook = Guestbook::findOrFail($id);

        return Inertia::render('Admin/guestbook/GuestbookEdit', [
            'title' => '編輯留言',
            'guestbook' => $guestbook
        ]);
    }

    public function update(GuestbookRequest $request, $id)
    {
        $guestbook = Guestbook::findOrFail($id);
        $validated = $request->validated();

        $guestbook->update([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'sort_order' => $validated['sort_order'],
            'published_date' => $validated['published_date'] ?? now(),
            'end_date' => $validated['end_date'] ?? '2200-12-31',
            'category' => $validated['category'] ?? null,
            'question' => $validated['question'],
            'brief' => $validated['brief'] ?? null,
            'answer' => $validated['answer'] ?? null,
            'question_date' => $validated['question_date'] ?? null,
            'answer_date' => $validated['answer_date'] ?? null,
            'asker_name' => $validated['asker_name'] ?? null,
            'asker_company' => $validated['asker_company'] ?? null,
            'asker_mobile' => $validated['asker_mobile'] ?? null,
            'asker_phone' => $validated['asker_phone'] ?? null,
            'asker_fax' => $validated['asker_fax'] ?? null,
            'asker_email' => $validated['asker_email'] ?? null,
            'asker_line' => $validated['asker_line'] ?? null,
            'asker_wechat' => $validated['asker_wechat'] ?? null,
            'asker_whatsapp' => $validated['asker_whatsapp'] ?? null,
            'asker_country' => $validated['asker_country'] ?? null,
            'asker_note' => $validated['asker_note'] ?? null,
            'note' => $validated['note'] ?? null,
            'has_photo' => $validated['has_photo'] ?? false,
        ]);

        return redirect()->route('admin.guestbook.index')
                         ->with('success', '留言更新成功');
    }

    public function destroy($id)
    {
        $guestbook = Guestbook::findOrFail($id);
        $guestbook->delete();

        return redirect()->route('admin.guestbook.index')
                         ->with('success', '留言刪除成功');
    }

    public function toggleStatus($id)
    {
        $guestbook = Guestbook::findOrFail($id);
        $guestbook->update(['status' => !$guestbook->status]);

        return redirect()->back()->with('success', '狀態已更新');
    }

    public function resetViews($id)
    {
        $guestbook = Guestbook::findOrFail($id);
        $guestbook->update(['views' => 0]);

        return redirect()->back()->with('success', '點閱數已清除');
    }

    public function updateSort($id)
    {
        $guestbook = Guestbook::findOrFail($id);
        $guestbook->update(['sort_order' => request('sort_order')]);

        return redirect()->back()->with('success', '排序已更新');
    }
}