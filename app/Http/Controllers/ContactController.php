<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function show()
    {
        return Inertia::render('contact');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'mobile' => ['required', 'string', 'max:30'],
            'message' => ['required', 'string', 'max:5000'],
            'code' => ['required', 'string', 'size:5'],
        ], [
            'name.required' => '請輸入姓名',
            'mobile.required' => '請輸入連絡電話',
            'message.required' => '請輸入內容',
            'code.required' => '請輸入驗證碼',
            'code.size' => '驗證碼格式不正確',
        ]);

        $expected = strtoupper((string) $request->session()->get('contact_captcha', ''));

        if ($expected === '' || strtoupper($validated['code']) !== $expected) {
            return back()->withErrors(['code' => '驗證碼錯誤，請重新輸入'])->withInput();
        }

        $request->session()->forget('contact_captcha');

        Log::info('Contact form submission', [
            'name' => $validated['name'],
            'mobile' => $validated['mobile'],
            'message' => $validated['message'],
        ]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => '您的訊息已送出，我們會盡快回覆您。',
        ]);

        return back();
    }

    public function captcha(Request $request)
    {
        $code = strtoupper(substr(str_shuffle('ABCDEFGHJKLMNPQRSTUVWXYZ23456789'), 0, 5));
        $request->session()->put('contact_captcha', $code);

        $width = 100;
        $height = 30;
        $image = imagecreatetruecolor($width, $height);

        $background = imagecolorallocate($image, 255, 255, 255);
        $textColor = imagecolorallocate($image, 40, 40, 40);
        $lineColor = imagecolorallocate($image, 180, 180, 180);

        imagefilledrectangle($image, 0, 0, $width, $height, $background);

        for ($i = 0; $i < 4; $i++) {
            imageline(
                $image,
                random_int(0, $width),
                random_int(0, $height),
                random_int(0, $width),
                random_int(0, $height),
                $lineColor
            );
        }

        $font = 5;
        $textWidth = imagefontwidth($font) * strlen($code);
        $x = (int) (($width - $textWidth) / 2);
        $y = (int) (($height - imagefontheight($font)) / 2);
        imagestring($image, $font, $x, $y, $code, $textColor);

        ob_start();
        imagepng($image);
        $png = ob_get_clean();
        imagedestroy($image);

        return response($png, 200, [
            'Content-Type' => 'image/png',
            'Cache-Control' => 'no-store, no-cache, must-revalidate',
        ]);
    }
}
