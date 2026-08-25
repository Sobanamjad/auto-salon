<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        News::create([
            'published_date' => '2026-07-13 17:06:00',
            'end_date' => '2200-12-31',
            'status' => true,
            'show_on_home' => true,
            'show_marquee' => true,
            'sort_order' => 999,
            'category' => '會務活動',
            'subject' => '2026年7月1日聯誼餐敘',
            'brief' => '本會將於7月1日舉辦聯誼餐敘活動',
            'content' => '<p>本會將於2026年7月1日舉辦聯誼餐敘活動，歡迎各位會員踴躍參加。</p>',
            'keyword' => '聯誼,餐敘',
            'video' => null,
            'map' => null,
            'note' => null,
            'views' => 8,
        ]);

        News::create([
            'published_date' => '2026-07-13 17:06:00',
            'end_date' => '2200-12-31',
            'status' => true,
            'show_on_home' => true,
            'show_marquee' => true,
            'sort_order' => 999,
            'category' => '最新公告',
            'subject' => '2026年度捐血接力暨聯合捐血活動',
            'brief' => '年度捐血活動開始報名',
            'content' => '<p>2026年度捐血接力暨聯合捐血活動即將開始，請各位會員踴躍參與。</p>',
            'keyword' => '捐血,公益',
            'video' => null,
            'map' => null,
            'note' => null,
            'views' => 7,
        ]);

        News::create([
            'published_date' => '2026-07-13 17:06:00',
            'end_date' => '2200-12-31',
            'status' => true,
            'show_on_home' => true,
            'show_marquee' => true,
            'sort_order' => 999,
            'category' => '會務活動',
            'subject' => '會員服務',
            'brief' => '會員服務說明',
            'content' => '<p>本會提供各項會員服務，詳情請參閱會員服務頁面。</p>',
            'keyword' => '會員,服務',
            'video' => null,
            'map' => null,
            'note' => null,
            'views' => 7,
        ]);

        News::create([
            'published_date' => '2026-07-13 17:06:00',
            'end_date' => '2200-12-31',
            'status' => true,
            'show_on_home' => true,
            'show_marquee' => true,
            'sort_order' => 999,
            'category' => '最新公告',
            'subject' => '2025-2027年度糖尿病篩檢社會服務',
            'brief' => '糖尿病篩檢服務',
            'content' => '<p>2025-2027年度糖尿病篩檢社會服務活動詳情。</p>',
            'keyword' => '糖尿病,篩檢,健康',
            'video' => null,
            'map' => null,
            'note' => null,
            'views' => 7,
        ]);
    }
}
