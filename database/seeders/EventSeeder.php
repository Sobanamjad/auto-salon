<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Event::create([
            'title' => '1. 我要申請入會',
            'category' => '本會活動',
            'status' => '停止報名',
            'date_start' => '2027-12-25',
            'date_end' => '2099-07-25',
            'signup_start' => '2025-07-25',
            'signup_end' => '2026-08-06',
            'is_open' => false,
            'content' => '<p>入會申請說明...</p>',
            'max_attendees' => 0,
            'location' => '本會會議室',
            'is_featured' => false,
            'sort_order' => 999,
            'signup_count' => 0,
            'views' => 4,
            'checkin' => 0,
            'absent' => 0,
            'income' => 0,
            'expense' => 0,
            'qa_status' => '關閉中',
            'qa_count' => 0,
        ]);

        Event::create([
            'title' => '2026年度會員大會',
            'category' => '本會活動',
            'status' => '開放報名',
            'date_start' => '2026-09-15',
            'date_end' => '2026-09-15',
            'signup_start' => '2026-08-01',
            'signup_end' => '2026-09-10',
            'is_open' => true,
            'content' => '<p>年度會員大會將於9月15日舉行，歡迎各位會員踴躍參加。</p>',
            'max_attendees' => 100,
            'location' => '永康區活動中心',
            'is_featured' => true,
            'sort_order' => 1,
            'signup_count' => 25,
            'views' => 120,
            'checkin' => 0,
            'absent' => 0,
            'income' => 0,
            'expense' => 0,
            'qa_status' => '開放中',
            'qa_count' => 5,
        ]);

        Event::create([
            'title' => '中秋聯歡晚會',
            'category' => '本會活動',
            'status' => '開放報名',
            'date_start' => '2026-09-28',
            'date_end' => '2026-09-28',
            'signup_start' => '2026-08-15',
            'signup_end' => '2026-09-25',
            'is_open' => true,
            'content' => '<p>中秋節聯歡晚會，備有月餅和精彩節目。</p>',
            'max_attendees' => 50,
            'location' => '本會會議室',
            'is_featured' => false,
            'sort_order' => 2,
            'signup_count' => 12,
            'views' => 45,
            'checkin' => 0,
            'absent' => 0,
            'income' => 0,
            'expense' => 0,
            'qa_status' => '開放中',
            'qa_count' => 2,
        ]);
    }
}
