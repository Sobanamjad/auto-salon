<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MemberAnnouncementRequest;
use App\Models\MemberAnnouncement;
use Inertia\Inertia;

class MemberAnnouncementController extends Controller
{
    public function index()
    {
        $announcements = MemberAnnouncement::ordered()->get();

        return Inertia::render('admin/member-announcements/MemberAnnouncementList', [
            'title' => '會員公告',
            'announcements' => $announcements
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/member-announcements/MemberAnnouncementCreate', [
            'title' => '新增會員公告'
        ]);
    }

    public function store(MemberAnnouncementRequest $request)
    {
        $validated = $request->validated();

        MemberAnnouncement::create([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'sort_order' => $validated['sort_order'],
            'published_date' => $validated['published_date'] ?? now(),
            'end_date' => $validated['end_date'] ?? '2200-12-31',
            'subject' => $validated['subject'],
            'content' => $validated['content'],
            'target_audience' => $validated['target_audience'] ?? null,
            'has_attachment' => $validated['has_attachment'] ?? false,
            'has_photo' => $validated['has_photo'] ?? false,
            'note' => $validated['note'] ?? null,
            'views' => 0,
        ]);

        return redirect()->route('admin.member-announcements.index')
                         ->with('success', '會員公告新增成功');
    }

    public function edit($id)
    {
        $announcement = MemberAnnouncement::findOrFail($id);

        return Inertia::render('admin/member-announcements/MemberAnnouncementEdit', [
            'title' => '編輯會員公告',
            'announcement' => $announcement
        ]);
    }

    public function update(MemberAnnouncementRequest $request, $id)
    {
        $announcement = MemberAnnouncement::findOrFail($id);
        $validated = $request->validated();

        $announcement->update([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'sort_order' => $validated['sort_order'],
            'published_date' => $validated['published_date'] ?? now(),
            'end_date' => $validated['end_date'] ?? '2200-12-31',
            'subject' => $validated['subject'],
            'content' => $validated['content'],
            'target_audience' => $validated['target_audience'] ?? null,
            'has_attachment' => $validated['has_attachment'] ?? false,
            'has_photo' => $validated['has_photo'] ?? false,
            'note' => $validated['note'] ?? null,
        ]);

        return redirect()->route('admin.member-announcements.index')
                         ->with('success', '會員公告更新成功');
    }

    public function destroy($id)
    {
        $announcement = MemberAnnouncement::findOrFail($id);
        $announcement->delete();

        return redirect()->route('admin.member-announcements.index')
                         ->with('success', '會員公告刪除成功');
    }

    public function preview($id)
    {
        $announcement = MemberAnnouncement::findOrFail($id);

        return Inertia::render('admin/member-announcements/MemberAnnouncementPreview', [
            'title' => '預覽會員公告',
            'announcement' => $announcement
        ]);
    }
}