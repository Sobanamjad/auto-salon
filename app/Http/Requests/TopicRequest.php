// app/Http/Requests/TopicRequest.php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TopicRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'city' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'is_active' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => '請輸入主題',
            'title.max' => '主題不能超過255個字',
        ];
    }
}