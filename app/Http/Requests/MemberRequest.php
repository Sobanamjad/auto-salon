<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'member_no' => 'nullable|string|max:50|unique:members,member_no',
            'name' => 'required|string|max:255',
            'gender' => 'nullable|in:先生,小姐',
            'phone' => 'nullable|string|max:20',
            'mobile' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'username' => 'nullable|string|max:50|unique:members,username',
            'company' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'school' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'category2' => 'nullable|string|max:255',
            'member_type' => 'nullable|string|max:50',
            'position_in_association' => 'nullable|string|max:255',
            'affiliated_unit' => 'nullable|string|max:255',
            'period_start' => 'nullable|date',
            'period_end' => 'nullable|date|after_or_equal:period_start',
            'fee' => 'nullable|numeric|min:0',
            'note' => 'nullable|string',
            'sort_order' => 'nullable|integer|min:0',
            'status' => 'boolean',
        ];

        if ($this->isMethod('POST')) {
            $rules['password'] = 'nullable|string|min:6|max:255';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.required' => '請輸入姓名',
            'name.max' => '姓名不能超過255個字',
            'gender.in' => '性別選項無效',
            'email.email' => '請輸入有效的電子郵件',
            'username.unique' => '此帳號已被使用',
            'member_no.unique' => '此會員編號已被使用',
            'period_end.after_or_equal' => '結束日期必須晚於或等於開始日期',
            'fee.numeric' => '費用必須為數字',
            'fee.min' => '費用不能小於0',
        ];
    }
}