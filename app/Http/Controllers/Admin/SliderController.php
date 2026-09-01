<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SliderRequest;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SliderController extends Controller
{
    public function index()
    {
        $sliders = Slider::ordered()->get();

        return Inertia::render('Admin/slider/Slider', [
            'title' => '相片輪播',
            'sliders' => $sliders,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/slider/SliderForm', [
            'title' => '新增輪播',
            'slider' => null,
        ]);
    }

    public function store(SliderRequest $request)
    {
        $data = $request->validated();

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '_' . $image->getClientOriginalName();
            $path = $image->storeAs('public/sliders', $filename);
            $data['image'] = $filename;
        }

        Slider::create($data);

        return redirect()->route('admin.slider.index')
                         ->with('success', '輪播新增成功！');
    }

    public function edit($id)
    {
        $slider = Slider::findOrFail($id);

        return Inertia::render('Admin/slider/SliderForm', [
            'title' => '編輯輪播',
            'slider' => $slider,
        ]);
    }

    public function update(SliderRequest $request, $id)
    {
        $slider = Slider::findOrFail($id);
        $data = $request->validated();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($slider->image) {
                Storage::delete('public/sliders/' . $slider->image);
            }
            $image = $request->file('image');
            $filename = time() . '_' . $image->getClientOriginalName();
            $path = $image->storeAs('public/sliders', $filename);
            $data['image'] = $filename;
        }

        $slider->update($data);

        return redirect()->route('admin.slider.index')
                         ->with('success', '輪播更新成功！');
    }

    public function destroy($id)
    {
        $slider = Slider::findOrFail($id);

        // Delete image
        if ($slider->image) {
            Storage::delete('public/sliders/' . $slider->image);
        }

        $slider->delete();

        return redirect()->route('admin.slider.index')
                         ->with('success', '輪播刪除成功！');
    }

    public function toggleActive($id)
    {
        $slider = Slider::findOrFail($id);
        $slider->update(['is_active' => !$slider->is_active]);

        return redirect()->back()->with('success', '狀態已更新！');
    }

    public function updateSort(Request $request, $id)
    {
        $request->validate([
            'sort_order' => 'required|integer|min:0',
        ]);

        $slider = Slider::findOrFail($id);
        $slider->update(['sort_order' => $request->sort_order]);

        return redirect()->back()->with('success', '排序已更新！');
    }
}