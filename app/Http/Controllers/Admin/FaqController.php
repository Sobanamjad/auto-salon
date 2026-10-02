<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function index()
    {
        $faqs = Faq::ordered()->get();

        return Inertia::render('Admin/faq/Faq', [
            'title' => '常見問題',
            'faqs' => $faqs,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/faq/FaqCreate', [
            'title' => '新增常見問題',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'nullable|string|max:255',
            'question' => 'required|string|max:255',
            'answer_html' => 'required|string',
            'status' => 'boolean',
            'sort_order' => 'integer',
        ]);

        Faq::create([
            'category' => $validated['category'],
            'question' => $validated['question'],
            'answer_html' => $validated['answer_html'],
            'status' => $validated['status'] ?? true,
            'sort_order' => $validated['sort_order'] ?? 999,
            'views' => 0,
        ]);

        return redirect()->route('admin.faq.index')
                         ->with('success', '常見問題新增成功');
    }

    public function edit($id)
    {
        $faq = Faq::findOrFail($id);

        return Inertia::render('Admin/faq/FaqEdit', [
            'title' => '編輯常見問題',
            'faq' => $faq,
        ]);
    }

    public function update(Request $request, $id)
    {
        $faq = Faq::findOrFail($id);
        $validated = $request->validate([
            'category' => 'nullable|string|max:255',
            'question' => 'required|string|max:255',
            'answer_html' => 'required|string',
            'status' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $faq->update([
            'category' => $validated['category'],
            'question' => $validated['question'],
            'answer_html' => $validated['answer_html'],
            'status' => $validated['status'],
            'sort_order' => $validated['sort_order'],
        ]);

        return redirect()->route('admin.faq.index')
                         ->with('success', '常見問題更新成功');
    }

    public function destroy($id)
    {
        $faq = Faq::findOrFail($id);
        $faq->delete();

        return redirect()->route('admin.faq.index')
                         ->with('success', '常見問題刪除成功');
    }
}
