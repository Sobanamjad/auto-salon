<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::ordered()->get();

        return Inertia::render('Admin/products/ProductList', [
            'title' => '會員商品',
            'products' => $products
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/products/ProductCreate', [
            'title' => '新增商品'
        ]);
    }

    public function store(ProductRequest $request)
    {
        $validated = $request->validated();

        Product::create([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order' => $validated['sort_order'],
            'published_date' => $validated['published_date'] ?? now(),
            'end_date' => $validated['end_date'] ?? '2200-12-31',
            'category' => $validated['category'] ?? null,
            'product_no' => $validated['product_no'] ?? null,
            'name' => $validated['name'],
            'brief' => $validated['brief'] ?? null,
            'content' => $validated['content'] ?? null,
            'video' => $validated['video'] ?? null,
            'note' => $validated['note'] ?? null,
            'has_photo' => $validated['has_photo'] ?? false,
            'price' => $validated['price'] ?? null,
            'currency' => $validated['currency'] ?? 'NT',
            'stock' => $validated['stock'] ?? 0,
            'views' => 0,
        ]);

        return redirect()->route('admin.products.index')
                         ->with('success', '商品新增成功');
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('Admin/products/ProductEdit', [
            'title' => '編輯商品',
            'product' => $product
        ]);
    }

    public function update(ProductRequest $request, $id)
    {
        $product = Product::findOrFail($id);
        $validated = $request->validated();

        $product->update([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order' => $validated['sort_order'],
            'published_date' => $validated['published_date'] ?? now(),
            'end_date' => $validated['end_date'] ?? '2200-12-31',
            'category' => $validated['category'] ?? null,
            'product_no' => $validated['product_no'] ?? null,
            'name' => $validated['name'],
            'brief' => $validated['brief'] ?? null,
            'content' => $validated['content'] ?? null,
            'video' => $validated['video'] ?? null,
            'note' => $validated['note'] ?? null,
            'has_photo' => $validated['has_photo'] ?? false,
            'price' => $validated['price'] ?? null,
            'currency' => $validated['currency'] ?? 'NT',
            'stock' => $validated['stock'] ?? 0,
        ]);

        return redirect()->route('admin.products.index')
                         ->with('success', '商品更新成功');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('admin.products.index')
                         ->with('success', '商品刪除成功');
    }

    public function toggleHome($id)
    {
        $product = Product::findOrFail($id);
        $product->update(['show_on_home' => !$product->show_on_home]);

        return redirect()->back()->with('success', '首頁顯示狀態已更新');
    }

    public function resetViews($id)
    {
        $product = Product::findOrFail($id);
        $product->update(['views' => 0]);

        return redirect()->back()->with('success', '點閱數已清除');
    }

    public function updateSort($id)
    {
        $product = Product::findOrFail($id);
        $product->update(['sort_order' => request('sort_order')]);

        return redirect()->back()->with('success', '排序已更新');
    }
}