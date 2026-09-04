<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PartnerRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'city' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'village' => 'nullable|string|max:255',
            'brief' => 'nullable|string',
            'content' => 'nullable|string',
            'note' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'slogan' => 'nullable|string|max:255',
            'tag' => 'nullable|string|max:255',
            'external_link' => 'nullable|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'booking_link' => 'nullable|string|max:255',
            'take_number_link' => 'nullable|string|max:255',
            'current_number_link' => 'nullable|string|max:255',
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
            'name.required' => '請輸入姓名',
            'name.max' => '姓名不能超過255個字',
        ];
    }
}