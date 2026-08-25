<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AboutRequest;
use App\Models\About;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutController extends Controller
{
    /**
     * Display a listing of about items.
     */
    public function index()
    {
        $abouts = About::orderBy('sort_order', 'asc')
                       ->orderBy('created_at', 'desc')
                       ->get();

        return Inertia::render('Admin/about/AboutList', [
            'title' => '關於本會',
            'abouts' => $abouts
        ]);
    }

    /**
     * Show the form for creating a new about item.
     */
    public function create()
    {
        return Inertia::render('Admin/about/AboutCreate', [
            'title' => '新增關於本會'
        ]);
    }

    /**
     * Store a newly created about item in storage.
     */
    public function store(AboutRequest $request)
    {
        $validated = $request->validated();

        // Handle image upload
        $imagePath = $this->handleImageUpload($request);

        // Create about
        About::create([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order' => $validated['sort_order'],
            'category' => $validated['category'] ?? null,
            'subject' => $validated['subject'],
            'brief' => $validated['brief'] ?? null,
            'content' => $validated['content'],
            'image' => $imagePath,
            'video' => $validated['video'] ?? null,
            'note' => $validated['note'] ?? null,
            'issuedate' => $validated['issuedate'] ?? null,
            'enddate' => $validated['enddate'] ?? null,
        ]);

        return redirect()
            ->route('admin.about.index')
            ->with('success', '關於本會新增成功');
    }

    /**
     * Show the form for editing the specified about item.
     */
    public function edit($id)
    {
        $about = About::findOrFail($id);

        return Inertia::render('Admin/about/AboutEdit', [
            'title' => '編輯關於本會',
            'about' => $about
        ]);
    }

    /**
     * Update the specified about item in storage.
     */
    public function update(AboutRequest $request, $id)
    {
        $about = About::findOrFail($id);
        $validated = $request->validated();

        // Handle image upload
        $imagePath = $this->handleImageUpload($request, $about);

        // Update about
        $about->update([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order' => $validated['sort_order'],
            'category' => $validated['category'] ?? null,
            'subject' => $validated['subject'],
            'brief' => $validated['brief'] ?? null,
            'content' => $validated['content'],
            'image' => $imagePath,
            'video' => $validated['video'] ?? null,
            'note' => $validated['note'] ?? null,
            'issuedate' => $validated['issuedate'] ?? null,
            'enddate' => $validated['enddate'] ?? null,
        ]);

        return redirect()
            ->route('admin.about.index')
            ->with('success', '關於本會更新成功');
    }

    /**
     * Remove the specified about item from storage.
     */
    public function destroy($id)
    {
        $about = About::findOrFail($id);

        // Delete image if exists
        if ($about->image && Storage::disk('public')->exists($about->image)) {
            Storage::disk('public')->delete($about->image);
        }

        $about->delete();

        return redirect()
            ->route('admin.about.index')
            ->with('success', '關於本會刪除成功');
    }

    /**
     * Handle image upload.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\About|null $about
     * @return string|null
     */
    private function handleImageUpload($request, $about = null)
    {
        if (!$request->hasFile('image')) {
            return $about ? $about->image : null;
        }

        // Delete old image if exists
        if ($about && $about->image && Storage::disk('public')->exists($about->image)) {
            Storage::disk('public')->delete($about->image);
        }

        // Store new image
        return $request->file('image')->store('about', 'public');
    }
}