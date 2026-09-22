<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DirectorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'sn'             => 'nullable|string|max:255',
            'language'       => 'required|in:TS,EN,JP',
            'status'         => 'required|in:0,1,true,false',
            'show_on_home'   => 'required|in:0,1,true,false',
            'sort_order'     => 'required|integer|min:0',
            'published_date' => 'nullable|date',
            'end_date'       => 'nullable|date|after_or_equal:published_date',
            'category'       => 'required|string|max:255',
            'title'          => 'required|string|max:255',
            'name'           => 'nullable|string|max:255',
            'brief'          => 'nullable|string',
            'content'        => 'nullable|string',
            'video'          => 'nullable|string',
            'note'           => 'nullable|string',
            'has_photo'      => 'nullable|in:0,1,true,false',
            'image'          => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'remove_image'   => 'nullable|in:0,1,true,false',
        ];
    }

    protected function prepareForValidation(): void
    {
        // FormData sends booleans as strings — cast them back
        foreach (['status', 'show_on_home', 'has_photo', 'remove_image'] as $field) {
            if ($this->has($field)) {
                $this->merge([
                    $field => filter_var($this->input($field), FILTER_VALIDATE_BOOLEAN),
                ]);
            }
        }

        if ($this->has('sort_order')) {
            $this->merge(['sort_order' => (int) $this->input('sort_order')]);
        }
    }

    public function messages(): array
    {
        return [
            'language.required' => '請選擇語言',
            'language.in' => '語言選項無效',
            'status.required' => '請選擇狀態',
            'show_on_home.required' => '請選擇是否顯示在首頁',
            'sort_order.required' => '請輸入排序',
            'sort_order.integer' => '排序必須為數字',
            'sort_order.min' => '排序不能小於0',
            'category.required' => '請選擇分類',
            'title.required' => '請輸入職稱',
            'title.max' => '職稱不能超過255個字',
            'name.required' => '請輸入姓名',
            'name.max' => '姓名不能超過255個字',
            'end_date.after_or_equal' => '結束日期必須晚於或等於開始日期',
            'image.image' => '請上傳圖片檔案',
            'image.mimes' => '圖片格式必須為 jpeg, png, jpg, gif',
            'image.max' => '圖片大小不能超過5MB',
        ];
    }
}