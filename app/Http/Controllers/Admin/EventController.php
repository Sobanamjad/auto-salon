<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\EventRequest;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of events.
     */
    public function index()
    {
        $events = Event::orderBy('sort_order', 'asc')
                       ->orderBy('date_start', 'desc')
                       ->get();

        return Inertia::render('Admin/EventManagement', [
            'title' => '活動管理',
            'events' => $events
        ]);
    }

    /**
     * Show the form for creating a new event.
     */
    public function create()
    {
        return Inertia::render('Admin/EventCreate', [
            'title' => '新增活動'
        ]);
    }

    /**
     * Store a newly created event in storage.
     */
    public function store(EventRequest $request)
    {
        Event::create([
            'title' => $request->title,
            'category' => $request->category,
            'status' => $request->status,
            'date_start' => $request->date_start,
            'date_end' => $request->date_end,
            'signup_start' => $request->signup_start,
            'signup_end' => $request->signup_end,
            'is_open' => $request->boolean('is_open', true),
            'content' => $request->content,
            'max_attendees' => $request->max_attendees ?? 0,
            'location' => $request->location,
            'is_featured' => $request->boolean('is_featured', false),
            'sort_order' => $request->sort_order ?? 999,
        ]);

        return redirect()->route('admin.events.index')->with('success', '活動新增成功');
    }

    /**
     * Show the form for editing the specified event.
     */
    public function edit($id)
    {
        $event = Event::findOrFail($id);

        return Inertia::render('Admin/EventEdit', [
            'title' => '編輯活動',
            'event' => $event
        ]);
    }

    /**
     * Update the specified event in storage.
     */
    public function update(EventRequest $request, $id)
    {
        $event = Event::findOrFail($id);
        $event->update([
            'title' => $request->title,
            'category' => $request->category,
            'status' => $request->status,
            'date_start' => $request->date_start,
            'date_end' => $request->date_end,
            'signup_start' => $request->signup_start,
            'signup_end' => $request->signup_end,
            'is_open' => $request->boolean('is_open', true),
            'content' => $request->content,
            'max_attendees' => $request->max_attendees ?? 0,
            'location' => $request->location,
            'is_featured' => $request->boolean('is_featured', false),
            'sort_order' => $request->sort_order ?? 999,
        ]);

        return redirect()->route('admin.events.index')->with('success', '活動更新成功');
    }

    /**
     * Remove the specified event from storage.
     */
    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return redirect()->route('admin.events.index')->with('success', '活動刪除成功');
    }
}
