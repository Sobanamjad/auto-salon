<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactSettingController extends Controller
{
    public function edit()
    {
        $settings = ContactSetting::getSettings();

        return Inertia::render('Admin/ContactSettings', [
            'title' => '聯絡資訊設定',
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $settings = ContactSetting::getSettings();

        $validated = $request->validate([
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'facebook_url' => 'nullable|url|max:500',
            'address' => 'nullable|string|max:500',
            'map_embed_url' => 'nullable|url|max:1000',
        ]);

        $settings->update($validated);

        return redirect()->route('admin.contact-settings.edit')
                         ->with('success', '聯絡資訊更新成功');
    }
}
