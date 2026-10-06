<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AlbumComment;
use App\Models\Album;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlbumCommentController extends Controller
{
    public function index()
    {
        $selStatus  = request('sel_status');
        $selAlbum   = request('sel_album');
        $selSearch  = request('sel_title');

        $query = AlbumComment::with('album')->ordered();
        if ($selStatus) $query->byStatus($selStatus);
        if ($selAlbum)  $query->where('album_id', $selAlbum);
        if ($selSearch) $query->where(function($q) use ($selSearch) {
            $q->where('commenter_name', 'LIKE', "%{$selSearch}%")
              ->orWhere('content', 'LIKE', "%{$selSearch}%");
        });

        $comments = $query->paginate(20)->withQueryString();
        $albums   = Album::orderBy('title')->get(['id', 'title']);
        $statuses = AlbumComment::getStatuses();

        $stats = [
            'total'    => AlbumComment::count(),
            'pending'  => AlbumComment::where('status', 'pending')->count(),
            'approved' => AlbumComment::where('status', 'approved')->count(),
            'rejected' => AlbumComment::where('status', 'rejected')->count(),
        ];

        return Inertia::render('Admin/album-comments/AlbumCommentList', [
            'title'    => '相片留言',
            'data'     => $comments,
            'albums'   => $albums,
            'statuses' => $statuses,
            'stats'    => $stats,
            'filters'  => compact('selStatus', 'selAlbum', 'selSearch'),
        ]);
    }

    public function approve($id)
    {
        AlbumComment::findOrFail($id)->update(['status' => 'approved']);
        return redirect()->back()->with('success', '留言已通過！');
    }

    public function reject($id)
    {
        AlbumComment::findOrFail($id)->update(['status' => 'rejected']);
        return redirect()->back()->with('success', '留言已拒絕！');
    }

    public function togglePinned($id)
    {
        $item = AlbumComment::findOrFail($id);
        $item->update(['is_pinned' => !$item->is_pinned]);
        return redirect()->back()->with('success', '置頂狀態已更新！');
    }

    public function destroy($id)
    {
        AlbumComment::findOrFail($id)->delete();
        return redirect()->back()->with('success', '留言已刪除！');
    }

    public function bulkApprove(Request $request)
    {
        $ids = $request->validate(['ids' => 'required|array', 'ids.*' => 'integer'])['ids'];
        AlbumComment::whereIn('id', $ids)->update(['status' => 'approved']);
        return redirect()->back()->with('success', count($ids) . ' 筆留言已通過！');
    }

    public function bulkReject(Request $request)
    {
        $ids = $request->validate(['ids' => 'required|array', 'ids.*' => 'integer'])['ids'];
        AlbumComment::whereIn('id', $ids)->update(['status' => 'rejected']);
        return redirect()->back()->with('success', count($ids) . ' 筆留言已拒絕！');
    }

    public function bulkDelete(Request $request)
    {
        $ids = $request->validate(['ids' => 'required|array', 'ids.*' => 'integer'])['ids'];
        AlbumComment::whereIn('id', $ids)->delete();
        return redirect()->back()->with('success', count($ids) . ' 筆留言已刪除！');
    }
}
