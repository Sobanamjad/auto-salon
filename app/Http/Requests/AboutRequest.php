<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AboutRequest extends FormRequest
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
            'language' => 'required|in:TS,EN,JP',
            'status' => 'required|boolean',
            'show_on_home' => 'required|boolean',
            'sort_order' => 'required|integer|min:0',
            'category' => 'nullable|string|max:255',
            'subject' => 'required|string|max:255',
            'brief' => 'nullable|string',
            'content' => 'required|string',
            'video' => 'nullable|string|url',
            'note' => 'nullable|string',
            'issuedate' => 'nullable|date',
            'enddate' => 'nullable|date|after_or_equal:issuedate',
        ];

        // For update, image is nullable
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules['image'] = 'nullable|image|max:10240';
        } else {
            $rules['image'] = 'nullable|image|max:10240';
        }

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
            'image.image' => '請上傳圖片檔案',
            'image.max' => '圖片大小不能超過10MB',
            'video.url' => '請輸入有效的影片網址',
            'enddate.after_or_equal' => '結束日期必須晚於或等於開始日期',
        ];
    }
}