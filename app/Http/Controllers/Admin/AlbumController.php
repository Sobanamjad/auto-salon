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

        return Inertia::render('Admin/Album/Albums', [
            'title' => '活動花絮',
            'albums' => $albums
        ]);
    }

    /**
     * Show the form for creating a new album.
     */
    public function create()
    {
        return Inertia::render('Admin/Album/AlbumCreate', [
            'title' => '新增相簿'
        ]);
    }

    /**
     * Store a newly created album in storage.
     */
    public function store(AlbumRequest $request)
    {
        $coverImagePath = $request->cover_image;

        // Handle file upload
        if ($request->hasFile('cover_image_file')) {
            $file = $request->file('cover_image_file');
            $path = $file->store('album_covers', 'public');
            $coverImagePath = $path;
        }

        Album::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'cover_image' => $coverImagePath,
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

        return Inertia::render('Admin/Album/AlbumEdit', [
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
        $coverImagePath = $request->cover_image;

        // Handle file upload
        if ($request->hasFile('cover_image_file')) {
            $file = $request->file('cover_image_file');
            $path = $file->store('album_covers', 'public');
            $coverImagePath = $path;
        }

        $album->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'cover_image' => $coverImagePath,
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

    /**
     * Get public albums data for API
     */
    public function getPublicAlbums(Request $request)
    {
        $year = $request->query('year');

        $query = Album::where('status', 'published')
                      ->orderBy('sort_order', 'asc')
                      ->orderBy('album_date', 'desc');

        if ($year) {
            $query->whereYear('album_date', $year);
        }

        $albums = $query->get(['id', 'title', 'slug', 'description', 'cover_image', 'album_date', 'category', 'views', 'photo_count', 'comment_count']);

        return response()->json([
            'albums' => $albums->map(function ($album) {
                $coverImagePath = null;
                if ($album->cover_image) {
                    if (strpos($album->cover_image, 'http') === 0) {
                        $coverImagePath = $album->cover_image;
                    } elseif (strpos($album->cover_image, '/asd_files/') === 0) {
                        $coverImagePath = $album->cover_image;
                    } else {
                        $coverImagePath = '/storage/' . $album->cover_image;
                    }
                }

                return [
                    'id' => $album->id,
                    'title' => $album->title,
                    'slug' => $album->slug,
                    'description' => $album->description,
                    'cover_image' => $coverImagePath,
                    'album_date' => $album->album_date ? $album->album_date->format('Y-m-d') : null,
                    'category' => $album->category,
                    'views' => $album->views,
                    'photo_count' => $album->photo_count,
                    'comment_count' => $album->comment_count,
                ];
            })
        ]);
    }
}
