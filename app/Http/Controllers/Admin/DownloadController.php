<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Download;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DownloadController extends Controller
{
    public function index()
    {
        $selTitle    = request('sel_title');
        $selCategory = request('sel_csn');

        $query = Download::ordered();
        if ($selTitle)    $query->where('title', 'LIKE', "%{$selTitle}%");
        if ($selCategory) $query->where('category', $selCategory);

        $downloads   = $query->paginate(20)->withQueryString();
        $categories  = Download::whereNotNull('category')
            ->distinct()->pluck('category')->sort()->values()->toArray();

        return Inertia::render('Admin/downloads/DownloadList', [
            'title'      => '公文與表單',
            'data'       => $downloads,
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        $categories = Download::whereNotNull('category')
            ->distinct()->pluck('category')->sort()->values()->toArray();

        return Inertia::render('Admin/downloads/DownloadForm', [
            'title'      => '新增公文表單',
            'item'       => null,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'language'       => 'required|in:TS,EN,JP',
            'status'         => 'boolean',
            'show_on_home'   => 'boolean',
            'sort_order'     => 'integer|min:0',
            'published_date' => 'nullable|date',
            'end_date'       => 'nullable|date',
            'category'       => 'nullable|string|max:100',
            'brief'          => 'nullable|string',
            'ext_url'        => 'nullable|url|max:500',
            'note'           => 'nullable|string|max:500',
            'file'           => 'nullable|file|max:20480',
        ]);

        $filePath = null; $fileName = null; $fileType = null; $fileSize = 0;

        if ($request->hasFile('file')) {
            $file     = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $fileType = strtolower($file->getClientOriginalExtension());
            $fileSize = $file->getSize();
            $stored   = $file->store('downloads', 'public');
            $filePath = '/storage/' . $stored;
        }

        Download::create([
            'language'       => $validated['language'],
            'status'         => $validated['status']       ?? true,
            'show_on_home'   => $validated['show_on_home'] ?? false,
            'sort_order'     => $validated['sort_order']   ?? 0,
            'published_date' => $validated['published_date'] ?? now(),
            'end_date'       => $validated['end_date']     ?? '2200-12-31',
            'category'       => $validated['category']     ?? null,
            'title'          => $validated['title'],
            'brief'          => $validated['brief']        ?? null,
            'file_path'      => $filePath,
            'file_name'      => $fileName,
            'file_type'      => $fileType,
            'file_size'      => $fileSize,
            'ext_url'        => $validated['ext_url']      ?? null,
            'note'           => $validated['note']         ?? null,
            'views'          => 0,
        ]);

        return redirect()->route('admin.downloads.index')->with('success', '公文表單新增成功！');
    }

    public function edit($id)
    {
        $item = Download::findOrFail($id);
        $categories = Download::whereNotNull('category')
            ->distinct()->pluck('category')->sort()->values()->toArray();

        return Inertia::render('Admin/downloads/DownloadForm', [
            'title'      => '編輯公文表單',
            'item'       => $item,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, $id)
    {
        $item = Download::findOrFail($id);

        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'language'       => 'required|in:TS,EN,JP',
            'status'         => 'boolean',
            'show_on_home'   => 'boolean',
            'sort_order'     => 'integer|min:0',
            'published_date' => 'nullable|date',
            'end_date'       => 'nullable|date',
            'category'       => 'nullable|string|max:100',
            'brief'          => 'nullable|string',
            'ext_url'        => 'nullable|url|max:500',
            'note'           => 'nullable|string|max:500',
            'file'           => 'nullable|file|max:20480',
        ]);

        $filePath = $item->file_path;
        $fileName = $item->file_name;
        $fileType = $item->file_type;
        $fileSize = $item->file_size;

        if ($request->hasFile('file')) {
            // Delete old file
            if ($item->file_path && str_starts_with($item->file_path, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $item->file_path));
            }
            $file     = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $fileType = strtolower($file->getClientOriginalExtension());
            $fileSize = $file->getSize();
            $stored   = $file->store('downloads', 'public');
            $filePath = '/storage/' . $stored;
        }

        $item->update([
            'language'       => $validated['language'],
            'status'         => $validated['status']       ?? $item->status,
            'show_on_home'   => $validated['show_on_home'] ?? $item->show_on_home,
            'sort_order'     => $validated['sort_order']   ?? $item->sort_order,
            'published_date' => $validated['published_date'] ?? $item->published_date,
            'end_date'       => $validated['end_date']     ?? $item->end_date,
            'category'       => $validated['category']     ?? null,
            'title'          => $validated['title'],
            'brief'          => $validated['brief']        ?? null,
            'file_path'      => $filePath,
            'file_name'      => $fileName,
            'file_type'      => $fileType,
            'file_size'      => $fileSize,
            'ext_url'        => $validated['ext_url']      ?? null,
            'note'           => $validated['note']         ?? null,
        ]);

        return redirect()->route('admin.downloads.index')->with('success', '公文表單更新成功！');
    }

    public function destroy($id)
    {
        $item = Download::findOrFail($id);
        if ($item->file_path && str_starts_with($item->file_path, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $item->file_path));
        }
        $item->delete();

        return redirect()->route('admin.downloads.index')->with('success', '公文表單刪除成功！');
    }

    public function toggleStatus($id)
    {
        $item = Download::findOrFail($id);
        $item->update(['status' => !$item->status]);
        return redirect()->back()->with('success', '狀態已更新！');
    }

    public function updateSort($id)
    {
        $item = Download::findOrFail($id);
        $item->update(['sort_order' => (int) request('sort_order', 0)]);
        return redirect()->back()->with('success', '排序已更新！');
    }

    public function resetViews($id)
    {
        $item = Download::findOrFail($id);
        $item->update(['views' => 0]);
        return redirect()->back()->with('success', '點閱數已清除！');
    }
}
