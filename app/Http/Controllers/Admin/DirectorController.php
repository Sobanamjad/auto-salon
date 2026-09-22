<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DirectorRequest;
use App\Models\Director;
use Inertia\Inertia;

class DirectorController extends Controller
{
    public function index()
    {
        $directors = Director::ordered()->get();

        return Inertia::render('Admin/directors/Directors', [
            'title' => '理監事(組織)',
            'directors' => $directors
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/directors/DirectorCreate', [
            'title' => '新增理監事'
        ]);
    }

    public function store(DirectorRequest $request)
    {
        $validated = $request->validated();

        // Handle image upload
        $imgPath = null;
        $imgW = null;
        $imgH = null;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('works_files'), $imageName);
            $imgPath = '/works_files/' . $imageName;

            // Get image dimensions
            list($width, $height) = getimagesize(public_path($imgPath));
            $imgW = $width;
            $imgH = $height;
        }

        Director::create([
            'sn' => $validated['sn'] ?? null,
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order' => $validated['sort_order'],
            'published_date' => $validated['published_date'] ?? now(),
            'end_date' => $validated['end_date'] ?? '2200-12-31',
            'category' => $validated['category'],
            'title' => $validated['title'],
            'name' => $validated['name'],
            'brief' => $validated['brief'] ?? null,
            'content' => $validated['content'] ?? null,
            'video' => $validated['video'] ?? null,
            'note' => $validated['note'] ?? null,
            'has_photo' => $request->hasFile('image') || ($validated['has_photo'] ?? false),
            'img' => $imgPath,
            'img_w' => $imgW,
            'img_h' => $imgH,
            'views' => 0,
        ]);

        return redirect()->route('admin.directors.index')
                         ->with('success', '理監事新增成功');
    }

    public function edit($id)
    {
        $director = Director::findOrFail($id);

        return Inertia::render('Admin/directors/DirectorEdit', [
            'title' => '編輯理監事',
            'director' => $director
        ]);
    }

    public function update(DirectorRequest $request, $id)
    {
        $director = Director::findOrFail($id);
        $validated = $request->validated();

        // Handle image upload / removal
        $imgPath = $director->img;
        $imgW    = $director->img_w;
        $imgH    = $director->img_h;

        if ($request->hasFile('image')) {
            // Delete old image file if it exists
            if ($director->img && file_exists(public_path($director->img))) {
                unlink(public_path($director->img));
            }

            $image     = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('works_files'), $imageName);
            $imgPath   = '/works_files/' . $imageName;

            [$imgW, $imgH] = getimagesize(public_path($imgPath));

        } elseif ($request->boolean('remove_image')) {
            // Admin explicitly removed the image
            if ($director->img && file_exists(public_path($director->img))) {
                unlink(public_path($director->img));
            }
            $imgPath = null;
            $imgW    = null;
            $imgH    = null;
        }

        $director->update([
            'sn'           => $validated['sn'] ?? $director->sn,
            'language'     => $validated['language'],
            'status'       => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order'   => $validated['sort_order'],
            'published_date' => $validated['published_date'] ?? now(),
            'end_date'     => $validated['end_date'] ?? '2200-12-31',
            'category'     => $validated['category'],
            'title'        => $validated['title'],
            'name'         => $validated['name'],
            'brief'        => $validated['brief'] ?? null,
            'content'      => $validated['content'] ?? null,
            'video'        => $validated['video'] ?? null,
            'note'         => $validated['note'] ?? null,
            'has_photo'    => $request->hasFile('image') || ($validated['has_photo'] ?? false),
            'img'          => $imgPath,
            'img_w'        => $imgW,
            'img_h'        => $imgH,
        ]);

        return redirect()->route('admin.directors.index')
                         ->with('success', '理監事更新成功');
    }

    public function destroy($id)
    {
        $director = Director::findOrFail($id);
        $director->delete();

        return redirect()->route('admin.directors.index')
                         ->with('success', '理監事刪除成功');
    }

    public function toggleHome($id)
    {
        $director = Director::findOrFail($id);
        $director->update(['show_on_home' => !$director->show_on_home]);

        return redirect()->back()->with('success', '首頁顯示狀態已更新');
    }

    public function resetViews($id)
    {
        $director = Director::findOrFail($id);
        $director->update(['views' => 0]);

        return redirect()->back()->with('success', '點閱數已清除');
    }

    public function updateSort($id)
    {
        $director = Director::findOrFail($id);
        $director->update(['sort_order' => request('sort_order')]);

        return redirect()->back()->with('success', '排序已更新');
    }

    public function copy($id)
    {
        $director = Director::findOrFail($id);
        $newDirector = $director->replicate();
        $newDirector->title = $director->title . ' (複製)';
        $newDirector->name = $director->name . ' (複製)';
        $newDirector->views = 0;
        $newDirector->save();

        return redirect()->back()->with('success', '理監事複製成功');
    }
}