<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class AlbumRequest extends FormRequest
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
            'description' => 'nullable|string',
            'cover_image' => 'nullable|string|max:255',
            'cover_image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'album_date' => 'nullable|date',
            'category' => 'required|string|max:255',
            'status' => 'required|string|max:255|in:published,draft,archived',
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
            'title.required' => '相簿標題是必填的',
            'title.max' => '相簿標題不能超過255個字元',
            'category.required' => '分類是必填的',
            'status.required' => '狀態是必填的',
            'status.in' => '狀態必須是已發布、草稿或已封存',
            'sort_order.min' => '排序必須大於或等於0',
        ];
    }
}
