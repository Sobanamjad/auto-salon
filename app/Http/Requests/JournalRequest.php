<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JournalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'account_subject' => 'nullable|string|max:255',
            'serial_no' => 'required|string|max:50|unique:journals,serial_no,' . $this->id,
            'invoice_no' => 'nullable|string|max:50',
            'invoice_date' => 'nullable|date',
            'transaction_date' => 'required|date',
            'customer_name' => 'nullable|string|max:255',
            'customer_vat' => 'nullable|string|max:50',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:income,expense',
            'summary' => 'nullable|string',
            'is_invoice_encrypted' => 'boolean',
            'invoice_password' => 'nullable|string|max:50',
            'remark' => 'nullable|string',
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'serial_no.required' => '請輸入序號',
            'serial_no.unique' => '此序號已存在',
            'transaction_date.required' => '請選擇交易日',
            'amount.required' => '請輸入金額',
            'amount.numeric' => '金額必須為數字',
            'amount.min' => '金額不能為負數',
            'type.required' => '請選擇收入或支出',
            'type.in' => '類型無效',
        ];
    }
}