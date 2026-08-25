<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'language' => 'required|in:TS,EN,JP',
            'status' => 'required|boolean',
            'show_on_home' => 'required|boolean',
            'sort_order' => 'required|integer|min:0',
            'published_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:published_date',
            'category' => 'nullable|string|max:255',
            'product_no' => 'nullable|string|max:50',
            'name' => 'required|string|max:255',
            'brief' => 'nullable|string',
            'content' => 'nullable|string',
            'video' => 'nullable|string',
            'note' => 'nullable|string',
            'has_photo' => 'boolean',
            'price' => 'nullable|string',
            'currency' => 'nullable|string|max:10',
            'stock' => 'nullable|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'language.required' => '請選擇語言',
            'language.in' => '語言選項無效',
            'status.required' => '請選擇狀態',
            'show_on_home.required' => '請選擇是否顯示在首頁',
            'sort_order.required' => '請輸入排序',
            'sort_order.integer' => '排序必須為數字',
            'sort_order.min' => '排序不能小於0',
            'name.required' => '請輸入品名',
            'name.max' => '品名不能超過255個字',
            'end_date.after_or_equal' => '結束日期必須晚於或等於開始日期',
            'stock.integer' => '庫存必須為數字',
            'stock.min' => '庫存不能小於0',
        ];
    }
}