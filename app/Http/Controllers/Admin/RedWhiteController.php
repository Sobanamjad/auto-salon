<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RedWhiteRequest;
use App\Models\RedWhite;
use Inertia\Inertia;

class RedWhiteController extends Controller
{
    public function index()
    {
        $redWhite = RedWhite::ordered()
            ->paginate(20);

        return Inertia::render('Admin/red-white/RedWhite', [
            'title' => '紅白帖',
            'data' => $redWhite,
        ]);
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
        $sort = request()->input('sort_order', 0);
        $item->update(['sort_order' => $sort]);

        return redirect()->back()->with('success', '排序已更新！');
    }
}