<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AlbumRequest;
use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AlbumController extends Controller
{
    /**
     * Display a listing of albums.
     */
    public function index()
    {
        $albums = Album::orderBy('sort_order', 'asc')
                       ->orderBy('created_at', 'desc')
                       ->get();

        return Inertia::render('Admin/Albums', [
            'title' => '活動花絮',
            'albums' => $albums
        ]);
    }

    /**
     * Show the form for creating a new album.
     */
    public function create()
    {
        return Inertia::render('Admin/AlbumCreate', [
            'title' => '新增相簿'
        ]);
    }

    /**
     * Store a newly created album in storage.
     */
    public function store(AlbumRequest $request)
    {
        Album::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'cover_image' => $request->cover_image,
            'album_date' => $request->album_date,
            'category' => $request->category,
            'status' => $request->status,
            'is_featured' => $request->boolean('is_featured', false),
            'sort_order' => $request->sort_order ?? 999,
        ]);

        return redirect()->route('admin.albums.index')->with('success', '相簿新增成功');
    }

    /**
     * Show the form for editing the specified album.
     */
    public function edit($id)
    {
        $album = Album::findOrFail($id);

        return Inertia::render('Admin/AlbumEdit', [
            'title' => '編輯相簿',
            'album' => $album
        ]);
    }

    /**
     * Update the specified album in storage.
     */
    public function update(AlbumRequest $request, $id)
    {
        $album = Album::findOrFail($id);
        $album->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'cover_image' => $request->cover_image,
            'album_date' => $request->album_date,
            'category' => $request->category,
            'status' => $request->status,
            'is_featured' => $request->boolean('is_featured', false),
            'sort_order' => $request->sort_order ?? 999,
        ]);

        return redirect()->route('admin.albums.index')->with('success', '相簿更新成功');
    }

    /**
     * Remove the specified album from storage.
     */
    public function destroy($id)
    {
        $album = Album::findOrFail($id);
        $album->delete();

        return redirect()->route('admin.albums.index')->with('success', '相簿刪除成功');
    }
}
