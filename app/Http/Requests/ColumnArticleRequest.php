<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ColumnArticleRequest extends FormRequest
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
            'subject' => 'required|string|max:255',
            'brief' => 'nullable|string',
            'content' => 'required|string',
            'keyword' => 'nullable|string|max:10',
            'video' => 'nullable|string',
            'map' => 'nullable|string',
            'note' => 'nullable|string',
            'has_photo' => 'boolean',
            'platform_category' => 'nullable|string',
            'join_platform' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'language.required' => '請選擇語言',
            'language.in' => '語言選項無效',
            'status.required' => '請選擇狀態',
            'status.boolean' => '狀態格式無效',
            'show_on_home.required' => '請選擇是否顯示在首頁',
            'show_on_home.boolean' => '顯示在首頁格式無效',
            'sort_order.required' => '請輸入排序',
            'sort_order.integer' => '排序必須為數字',
            'sort_order.min' => '排序不能小於0',
            'subject.required' => '請輸入主題',
            'subject.max' => '主題不能超過255個字',
            'content.required' => '請輸入內容',
            'keyword.max' => '相關字不能超過10個字',
            'end_date.after_or_equal' => '結束日期必須晚於或等於開始日期',
        ];
    }
}