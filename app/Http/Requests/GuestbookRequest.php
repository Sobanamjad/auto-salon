<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuestbookRequest extends FormRequest
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
            'sort_order' => 'required|integer|min:0',
            'published_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:published_date',
            'category' => 'nullable|string|max:255',
            'question' => 'required|string|max:255',
            'brief' => 'nullable|string',
            'answer' => 'nullable|string',
            'question_date' => 'nullable|date',
            'answer_date' => 'nullable|date',
            'asker_name' => 'nullable|string|max:255',
            'asker_company' => 'nullable|string|max:255',
            'asker_mobile' => 'nullable|string|max:20',
            'asker_phone' => 'nullable|string|max:20',
            'asker_fax' => 'nullable|string|max:20',
            'asker_email' => 'nullable|email|max:255',
            'asker_line' => 'nullable|string|max:255',
            'asker_wechat' => 'nullable|string|max:255',
            'asker_whatsapp' => 'nullable|string|max:255',
            'asker_country' => 'nullable|string|max:255',
            'asker_note' => 'nullable|string',
            'note' => 'nullable|string',
            'has_photo' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'language.required' => '請選擇語言',
            'language.in' => '語言選項無效',
            'status.required' => '請選擇狀態',
            'status.boolean' => '狀態格式無效',
            'sort_order.required' => '請輸入排序',
            'sort_order.integer' => '排序必須為數字',
            'sort_order.min' => '排序不能小於0',
            'question.required' => '請輸入問題',
            'question.max' => '問題不能超過255個字',
            'asker_email.email' => '請輸入有效的電子郵件',
            'end_date.after_or_equal' => '結束日期必須晚於或等於開始日期',
        ];
    }
}