<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RedWhiteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category' => 'nullable|string',
            'person_name' => 'required|string|max:255',
            'event_date_start' => 'nullable|date',
            'event_date_end' => 'nullable|date',
            'attend_status' => 'nullable|string',
            'attendees' => 'nullable|string|max:500',
            'amount' => 'nullable|numeric|min:0',
            'remark' => 'nullable|string',
            'is_closed' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function messages(): array
    {
        return [
            'person_name.required' => '請輸入當事者姓名',
            'person_name.max' => '姓名不能超過255個字',
            'amount.numeric' => '款項必須為數字',
            'amount.min' => '款項不能為負數',
        ];
    }
}