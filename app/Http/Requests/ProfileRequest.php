<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Account Settings
            'new_isshow' => 'nullable|in:0,1',
            'e_name_card' => 'nullable|in:0,1',
            'is_meet' => 'nullable|in:0,1',
            'new_webpw' => 'nullable|string|min:6|max:255',

            // Personal Info
            'new_name' => 'required|string|max:255',
            'name_brief' => 'required|string|max:255',
            'new_tel1' => 'nullable|string|max:50',
            'new_tel2' => 'nullable|string|max:50',

            // Email
            'new_email' => 'nullable|email|max:255',
            'new_email2' => 'nullable|email|max:255',

            // Social Media
            'new_line' => 'nullable|string|max:255',
            'line_url' => 'nullable|url|max:255',
            'line_message_status' => 'nullable|in:0,1',
            'line_message_channel_id' => 'nullable|string|max:255',
            'line_message_access_token' => 'nullable|string|max:255',
            'line_message_secret' => 'nullable|string|max:255',
            'line_message_user_id' => 'nullable|string|max:255',
            'wechat' => 'nullable|string|max:255',
            'new_skype' => 'nullable|string|max:255',
            'new_fb' => 'nullable|url|max:255',
            'ig' => 'nullable|string|max:255',
            'twitter' => 'nullable|string|max:255',
            'weibo' => 'nullable|string|max:255',

            // Location & Address
            'new_addr' => 'nullable|string|max:500',

            // Business
            'new_url' => 'nullable|url|max:255',
            'working_hours' => 'nullable|string|max:255',
            'slogan' => 'nullable|string|max:255',
            'per_brief' => 'nullable|string|max:1000',
            'per_cond' => 'nullable|string',

            // Bank
            'bank' => 'nullable|string',

            // Other
            'new_note' => 'nullable|string|max:1000',
            'new_rule' => 'nullable|string|max:255',
            'new_unicode' => 'nullable|string|max:50',
            'new_fax' => 'nullable|string|max:50',
            'pd_cate_2_name' => 'nullable|string|max:255',

            // Ad Settings
            'ad_content' => 'nullable|string',
            'ad_url' => 'nullable|url|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'new_name.required' => '請輸入姓名',
            'new_name.max' => '姓名不能超過255個字',
            'name_brief.required' => '請輸入暱稱',
            'name_brief.max' => '暱稱不能超過255個字',
            'new_email.email' => '請輸入有效的電子郵件',
            'new_email2.email' => '請輸入有效的電子郵件',
            'line_url.url' => '請輸入有效的URL',
            'new_fb.url' => '請輸入有效的URL',
            'new_url.url' => '請輸入有效的URL',
            'new_webpw.min' => '密碼至少6個字元',
        ];
    }
}