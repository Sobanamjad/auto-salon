<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClubNewsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'language' => 'required|in:TS,EN,JP',
            'title' => 'required|string|max:255',
            'city' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'village' => 'nullable|string|max:255',
            'source' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'is_excluded' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'language.required' => '請選擇語言',
            'language.in' => '語言選項無效',
            'title.required' => '請輸入主題',
            'title.max' => '主題不能超過255個字',
        ];
    }
}