<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'language' => 'required|in:TS,EN,JP',
            'status' => 'required|boolean',
            'show_on_home' => 'required|boolean',
            'sort_order' => 'required|integer',
            'category' => 'nullable|string',
            'subject' => 'required|string',
            'brief' => 'nullable|string',
            'content' => 'required|string',
            'image' => 'nullable|image|max:10240',
            'video' => 'nullable|string',
            'note' => 'nullable|string',
            'issuedate' => 'nullable|date',
            'enddate' => 'nullable|date',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('about', 'public');
        }

        About::create([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order' => $validated['sort_order'],
            'category' => $validated['category'],
            'subject' => $validated['subject'],
            'brief' => $validated['brief'],
            'content' => $validated['content'],
            'image' => $imagePath,
            'video' => $validated['video'],
            'note' => $validated['note'],
            'issuedate' => $validated['issuedate'],
            'enddate' => $validated['enddate'],
        ]);

        return redirect()->route('admin.about.index')->with('success', '關於本會新增成功');
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
    public function update(Request $request, $id)
    {
        $about = About::findOrFail($id);

        $validated = $request->validate([
            'language' => 'required|in:TS,EN,JP',
            'status' => 'required|boolean',
            'show_on_home' => 'required|boolean',
            'sort_order' => 'required|integer',
            'category' => 'nullable|string',
            'subject' => 'required|string',
            'brief' => 'nullable|string',
            'content' => 'required|string',
            'image' => 'nullable|image|max:10240',
            'video' => 'nullable|string',
            'note' => 'nullable|string',
            'issuedate' => 'nullable|date',
            'enddate' => 'nullable|date',
        ]);

        $imagePath = $about->image;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('about', 'public');
        }

        $about->update([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order' => $validated['sort_order'],
            'category' => $validated['category'],
            'subject' => $validated['subject'],
            'brief' => $validated['brief'],
            'content' => $validated['content'],
            'image' => $imagePath,
            'video' => $validated['video'],
            'note' => $validated['note'],
            'issuedate' => $validated['issuedate'],
            'enddate' => $validated['enddate'],
        ]);

        return redirect()->route('admin.about.index')->with('success', '關於本會更新成功');
    }

    /**
     * Remove the specified about item from storage.
     */
    public function destroy($id)
    {
        $about = About::findOrFail($id);
        $about->delete();

        return redirect()->route('admin.about.index')->with('success', '關於本會刪除成功');
    }
}
