<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'date_start' => 'required|date',
            'date_end' => 'required|date|after_or_equal:date_start',
            'signup_start' => 'nullable|date',
            'signup_end' => 'nullable|date|after_or_equal:signup_start',
            'is_open' => 'boolean',
            'content' => 'nullable|string',
            'max_attendees' => 'integer|min:0',
            'location' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
            'sort_order' => 'integer|min:0',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => '活動標題是必填的',
            'title.max' => '活動標題不能超過255個字元',
            'category.required' => '分類是必填的',
            'status.required' => '狀態是必填的',
            'date_start.required' => '開始日期是必填的',
            'date_end.required' => '結束日期是必填的',
            'date_end.after_or_equal' => '結束日期必須在開始日期之後',
            'signup_end.after_or_equal' => '報名結束日期必須在報名開始日期之後',
            'max_attendees.min' => '最大參加人數必須大於或等於0',
            'sort_order.min' => '排序必須大於或等於0',
        ];
    }
}
