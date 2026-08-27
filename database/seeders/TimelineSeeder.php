<?php

namespace Database\Seeders;

use App\Models\Timeline;
use Illuminate\Database\Seeder;

class TimelineSeeder extends Seeder
{
    public function run()
    {
        $timelines = [
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'sort_order' => 999,
                'category' => '2025年',
                'event_date' => '2025-03-03',
                'title' => '歡迎新網站改版上線！！',
                'brief' => '全新網站改版上線，提供更完善的服務',
                'content' => '<p>歡迎新網站改版上線！！</p><p>全新設計，更好的使用體驗。</p>',
                'video' => null,
                'note' => '',
                'has_photo' => true,
                'views' => 5,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'sort_order' => 999,
                'category' => '2025年',
                'event_date' => '2025-07-25',
                'title' => '致贈xxxx單位社會服務金',
                'brief' => '致贈社會服務金，回饋社會',
                'content' => '<p>致贈xxxx單位社會服務金</p><p>善盡社會責任。</p>',
                'video' => null,
                'note' => '',
                'has_photo' => true,
                'views' => 5,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'sort_order' => 999,
                'category' => '2026年',
                'event_date' => '2026-05-22',
                'title' => '舉辦本會授證週年紀念慶典',
                'brief' => '舉辦授證週年紀念慶典，歡慶本會成立',
                'content' => '<p>舉辦本會授證週年紀念慶典</p><p>感謝各界支持。</p>',
                'video' => null,
                'note' => '',
                'has_photo' => true,
                'views' => 5,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'sort_order' => 999,
                'category' => '2026年',
                'event_date' => '2026-03-08',
                'title' => '社團達人協會會長交接典禮',
                'brief' => '舉行會長交接典禮，傳承與創新',
                'content' => '<p>社團達人協會會長交接典禮</p><p>新任會長宣誓就職。</p>',
                'video' => null,
                'note' => '',
                'has_photo' => true,
                'views' => 5,
            ],
        ];

        foreach ($timelines as $timeline) {
            Timeline::create($timeline);
        }
    }
}