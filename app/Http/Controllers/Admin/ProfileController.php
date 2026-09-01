<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('Admin/Profile', [
            'title' => '個人帳號資料',
            'user' => $user,
            'isEdit' => true,
        ]);
    }

    public function update(ProfileRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();

        // Update password if provided
        if (isset($data['new_webpw']) && !empty($data['new_webpw'])) {
            $user->password = Hash::make($data['new_webpw']);
        }

        // Map fields directly to user model
        $user->name = $data['new_name'] ?? $user->name;
        $user->nickname = $data['name_brief'] ?? null;
        $user->email = $data['new_email'] ?? $user->email;
        $user->email2 = $data['new_email2'] ?? null;
        $user->phone1 = $data['new_tel1'] ?? null;
        $user->phone2 = $data['new_tel2'] ?? null;
        $user->address = $data['new_addr'] ?? null;
        $user->website = $data['new_url'] ?? null;
        $user->working_hours = $data['working_hours'] ?? null;
        $user->slogan = $data['slogan'] ?? null;
        $user->brief = $data['per_brief'] ?? null;
        $user->description = $data['per_cond'] ?? null;
        $user->bank_account = $data['bank'] ?? null;
        $user->remark = $data['new_note'] ?? null;
        $user->position = $data['new_rule'] ?? null;
        $user->company_name = $data['pd_cate_2_name'] ?? null;
        $user->vat_number = $data['new_unicode'] ?? null;
        $user->fax = $data['new_fax'] ?? null;
        $user->line_id = $data['new_line'] ?? null;
        $user->line_url = $data['line_url'] ?? null;
        $user->line_message_status = $data['line_message_status'] ?? 0;
        $user->line_channel_id = $data['line_message_channel_id'] ?? null;
        $user->line_access_token = $data['line_message_access_token'] ?? null;
        $user->line_secret = $data['line_message_secret'] ?? null;
        $user->line_user_id = $data['line_message_user_id'] ?? null;
        $user->wechat = $data['wechat'] ?? null;
        $user->skype = $data['new_skype'] ?? null;
        $user->facebook = $data['new_fb'] ?? null;
        $user->instagram = $data['ig'] ?? null;
        $user->twitter = $data['twitter'] ?? null;
        $user->weibo = $data['weibo'] ?? null;
        $user->is_published = $data['new_isshow'] ?? 0;
        $user->e_name_card = $data['e_name_card'] ?? 0;
        $user->is_meet = $data['is_meet'] ?? 0;
        $user->ad_content = $data['ad_content'] ?? null;
        $user->ad_url = $data['ad_url'] ?? null;

        $user->save();

        return redirect()->route('admin.profile.index')
                         ->with('success', '個人資料更新成功！');
    }
}