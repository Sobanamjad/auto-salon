<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SliderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'language' => 'required|in:TS,EN,JP',
            'title' => 'nullable|string|max:255',
            'image_alt' => 'nullable|string|max:255',
            'link' => 'nullable|url|max:255',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'width' => 'nullable|integer|min:1',
            'height' => 'nullable|integer|min:1',
            'video_url' => 'nullable|url|max:255',
            'description' => 'nullable|string|max:500',
        ];

        // Image validation for create/update
        if ($this->isMethod('post') || $this->hasFile('image')) {
            $rules['image'] = 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120';
        } else {
            $rules['image'] = 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'language.required' => '請選擇語系',
            'language.in' => '語系選項無效',
            'image.required' => '請選擇圖片',
            'image.image' => '檔案必須是圖片',
            'image.mimes' => '圖片格式必須是: jpeg, png, jpg, gif, svg, webp',
            'image.max' => '圖片大小不能超過5MB',
            'link.url' => '請輸入有效的網址',
            'video_url.url' => '請輸入有效的影片網址',
            'sort_order.integer' => '排序必須為數字',
            'sort_order.min' => '排序不能為負數',
        ];
    }
}