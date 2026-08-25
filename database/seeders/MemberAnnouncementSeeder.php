<?php

namespace Database\Seeders;

use App\Models\MemberAnnouncement;
use Illuminate\Database\Seeder;

class MemberAnnouncementSeeder extends Seeder
{
    public function run()
    {
        $announcements = [
            [
                'language' => 'TS',
                'status' => true,
                'sort_order' => 1,
                'published_date' => '2026-08-01',
                'end_date' => '2200-12-31',
                'subject' => '2026年度會員大會通知',
                'content' => '<p>各位會員大家好：</p><p>本會將於2026年12月15日舉辦年度會員大會，敬請各位會員踴躍參加。</p><p>時間：2026年12月15日 下午2:00</p><p>地點：本會會館</p>',
                'target_audience' => '全部會員',
                'has_attachment' => true,
                'has_photo' => false,
                'views' => 45,
                'note' => '重要通知',
            ],
            [
                'language' => 'TS',
                'status' => true,
                'sort_order' => 2,
                'published_date' => '2026-08-15',
                'end_date' => '2200-12-31',
                'subject' => '會員會費繳交通知',
                'content' => '<p>親愛的會員：</p><p>2026年度會費已開始繳交，請於2026年10月31日前完成繳費。</p><p>繳費方式：銀行轉帳或現場繳交</p>',
                'target_audience' => '全部會員',
                'has_attachment' => true,
                'has_photo' => false,
                'views' => 38,
                'note' => '會費通知',
            ],
            [
                'language' => 'TS',
                'status' => true,
                'sort_order' => 3,
                'published_date' => '2026-08-20',
                'end_date' => '2200-12-31',
                'subject' => '中秋節聯歡晚會活動',
                'content' => '<p>慶祝中秋佳節，本會舉辦中秋聯歡晚會</p><p>日期：2026年9月28日</p><p>時間：晚上6:00</p><p>地點：本會會館</p>',
                'target_audience' => '全部會員',
                'has_attachment' => false,
                'has_photo' => true,
                'views' => 52,
                'note' => '活動通知',
            ],
        ];

        foreach ($announcements as $announcement) {
            MemberAnnouncement::create($announcement);
        }
    }
}