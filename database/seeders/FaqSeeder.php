<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run()
    {
        Faq::create([
            'category' => '加入問題',
            'question' => '加入本會需要收費嗎？費用多少？',
            'answer_html' => '<p>是的。主要分為入會費、常年會費：$1000/年，入會費：$500。</p>',
            'status' => true,
            'sort_order' => 1,
            'views' => 0,
        ]);

        Faq::create([
            'category' => '加入問題',
            'question' => '如何加入本會？',
            'answer_html' => '<p>請於網站「我要加入本會」填寫您的基本資料即可，並附上相關證明，我們在收到您的加入訊息，會主動與您聯繫並核對您的相關資料。非常歡迎您的加入！</p><p><a href="/announcement" target="_blank" rel="noopener noreferrer">https://auto.52salon.com/2236/announcement?new_csn=605</a></p>',
            'status' => true,
            'sort_order' => 2,
            'views' => 0,
        ]);
    }
}
