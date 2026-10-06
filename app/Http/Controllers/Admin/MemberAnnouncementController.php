<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MemberAnnouncementRequest;
use App\Models\MemberAnnouncement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberAnnouncementController extends Controller
{
    public function index()
    {
        $announcements = MemberAnnouncement::ordered()->get();

        return Inertia::render('Admin/member-announcements/MemberAnnouncementList', [
            'title' => '會員公告',
            'announcements' => $announcements
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/member-announcements/MemberAnnouncementCreate', [
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
            'category' => $validated['category'] ?? null,
            'subject' => $validated['subject'],
            'content' => $validated['content'],
            'target_audience' => $validated['target_audience'] ?? null,
            'has_attachment' => $validated['has_attachment'] ?? false,
            'has_photo' => $validated['has_photo'] ?? false,
            'photo' => $validated['photo'] ?? null,
            'photo_w' => $validated['photo_w'] ?? null,
            'photo_h' => $validated['photo_h'] ?? null,
            'external_link' => $validated['external_link'] ?? null,
            'event_status' => $validated['event_status'] ?? '報名期間',
            'note' => $validated['note'] ?? null,
            'views' => 0,
        ]);

        return redirect()->route('admin.member-announcements.index')
                         ->with('success', '會員公告新增成功');
    }

    public function edit($id)
    {
        $announcement = MemberAnnouncement::findOrFail($id);

        return Inertia::render('Admin/member-announcements/MemberAnnouncementEdit', [
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
            'category' => $validated['category'] ?? null,
            'subject' => $validated['subject'],
            'content' => $validated['content'],
            'target_audience' => $validated['target_audience'] ?? null,
            'has_attachment' => $validated['has_attachment'] ?? false,
            'has_photo' => $validated['has_photo'] ?? false,
            'photo' => $validated['photo'] ?? null,
            'photo_w' => $validated['photo_w'] ?? null,
            'photo_h' => $validated['photo_h'] ?? null,
            'external_link' => $validated['external_link'] ?? null,
            'event_status' => $validated['event_status'] ?? '報名期間',
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

        return Inertia::render('Admin/member-announcements/MemberAnnouncementPreview', [
            'title' => '預覽會員公告',
            'announcement' => $announcement
        ]);
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();

            // Store in public/images/announcements directory
            $path = $image->storeAs('images/announcements', $filename, 'public');

            // Get image dimensions
            list($width, $height) = getimagesize($image->getPathname());

            return response()->json([
                'success' => true,
                'path' => '/storage/' . $path,
                'width' => $width,
                'height' => $height,
            ]);
        }

        return response()->json(['success' => false, 'message' => 'No image uploaded'], 400);
    }
}