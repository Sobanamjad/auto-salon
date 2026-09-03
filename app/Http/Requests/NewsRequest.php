<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NewsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'published_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:published_date',
            'status' => 'required|boolean',
            'show_on_home' => 'required|boolean',
            'show_marquee' => 'required|boolean',
            'sort_order' => 'required|integer|min:0',
            'category' => 'required|string|max:255',
            'photo' => 'nullable|image|max:10240',
            'subject' => 'required|string|max:255',
            'brief' => 'nullable|string',
            'content' => 'required|string',
            'keyword' => 'nullable|string|max:255',
            'video' => 'nullable|string|url',
            'map' => 'nullable|string|url',
            'note' => 'nullable|string',
        ];

        return $rules;
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'published_date.required' => '請選擇發表日期',
            'published_date.date' => '發表日期格式無效',
            'end_date.required' => '請選擇截止日期',
            'end_date.date' => '截止日期格式無效',
            'end_date.after_or_equal' => '截止日期必須晚於或等於發表日期',
            'status.required' => '請選擇發佈狀態',
            'status.boolean' => '發佈狀態格式無效',
            'show_on_home.required' => '請選擇是否顯示在首頁',
            'show_on_home.boolean' => '首頁顯示格式無效',
            'show_marquee.required' => '請選擇是否顯示跑馬燈',
            'show_marquee.boolean' => '跑馬燈顯示格式無效',
            'sort_order.required' => '請輸入排序',
            'sort_order.integer' => '排序必須為數字',
            'sort_order.min' => '排序不能小於0',
            'category.required' => '請輸入分類',
            'photo.image' => '照片必須為圖片格式',
            'photo.max' => '照片大小不能超過10MB',
            'category.max' => '分類不能超過255個字',
            'subject.required' => '請輸入主題',
            'subject.max' => '主題不能超過255個字',
            'content.required' => '請輸入內容',
            'keyword.max' => '關鍵字不能超過255個字',
            'video.url' => '請輸入有效的影片網址',
            'map.url' => '請輸入有效的地圖網址',
        ];
    }
}
