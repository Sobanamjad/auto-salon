<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobRequest extends FormRequest
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
            'published_start' => 'nullable|date',
            'published_end' => 'nullable|date|after_or_equal:published_start',
            'job_no' => 'nullable|string|max:50',
            'company' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'contact_gender' => 'nullable|in:先生,小姐',
            'contact_phone' => 'nullable|string|max:20',
            'contact_mobile' => 'nullable|string|max:20',
            'contact_email' => 'nullable|email|max:255',
            'contact_web' => 'nullable|string|max:255',
            'work_location' => 'nullable|string|max:255',
            'work_area' => 'nullable|string|max:255',
            'nearby_school_1' => 'nullable|string|max:255',
            'nearby_school_2' => 'nullable|string|max:255',
            'job_title' => 'required|string|max:255',
            'salary' => 'nullable|string|max:255',
            'work_hours' => 'nullable|string|max:255',
            'vacancies' => 'nullable|string|max:50',
            'job_category' => 'nullable|string|max:255',
            'job_content' => 'nullable|string',
            'job_requirements' => 'nullable|string',
            'note' => 'nullable|string',
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
            'sort_order.required' => '請輸入排序',
            'sort_order.integer' => '排序必須為數字',
            'sort_order.min' => '排序不能小於0',
            'company.required' => '請輸入求才單位',
            'company.max' => '求才單位不能超過255個字',
            'job_title.required' => '請輸入職務名稱',
            'job_title.max' => '職務名稱不能超過255個字',
            'contact_email.email' => '請輸入有效的電子郵件',
            'contact_gender.in' => '性別選項無效',
            'published_end.after_or_equal' => '結束日期必須晚於或等於開始日期',
        ];
    }
}