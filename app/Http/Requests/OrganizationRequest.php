<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrganizationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'city' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'village' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:500',
            'website' => 'nullable|url|max:255',
            'contact_person' => 'nullable|string|max:255',
            'contact_phone' => 'nullable|string|max:50',
            'contact_email' => 'nullable|email|max:255',
            'description' => 'nullable|string',
            'language' => 'nullable|in:TS,EN,JP',
            'is_active' => 'boolean',
            'purchased_space' => 'nullable|integer|min:0',
            'line_card_space' => 'nullable|integer|min:0',
            'password' => 'nullable|string|min:6',
            'password_confirmation' => 'nullable|string|min:6',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => '請輸入公司名稱',
            'name.max' => '公司名稱不能超過255個字',
            'website.url' => '請輸入有效的網址',
            'contact_email.email' => '請輸入有效的電子郵件',
            'language.in' => '語言選項無效',
            'password.min' => '密碼至少需要6個字元',
            'password.confirmed' => '確認密碼與新密碼不一致',
        ];
    }
}