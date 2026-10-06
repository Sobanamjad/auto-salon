<?php

namespace Database\Seeders;

use App\Models\MemberAnnouncement;
use Illuminate\Database\Seeder;

class MemberAnnouncementSeeder extends Seeder
{
    public function run(): void
    {
        // category codes match the public /announcement route filter:
        // 733 = 本會活動, 1 = 總會活動, 2 = 好友的活動
        // event_status: 報名期間 / 即將開始 / 活動結束 / 進行中

        $announcements = [
            [
                'language'        => 'TS',
                'status'          => true,
                'sort_order'      => 1,
                'published_date'  => '2026-07-22',
                'end_date'        => '2200-12-31',
                'category'        => '733',
                'subject'         => '我要申請入會',
                'content'         => '<p>歡迎有意加入永康國際同濟會的朋友，請點擊下方連結填寫申請表。</p>',
                'target_audience' => '一般民眾',
                'has_attachment'  => false,
                'has_photo'       => true,
                'photo'           => '/announcement_files/s2026072213350710.png',
                'photo_w'         => 1024,
                'photo_h'         => 824,
                'external_link'   => 'https://gudate.com/2236/3905',
                'event_status'    => '報名期間',
                'views'           => 0,
                'note'            => null,
            ],
            [
                'language'        => 'TS',
                'status'          => true,
                'sort_order'      => 2,
                'published_date'  => '2026-07-22',
                'end_date'        => '2200-12-31',
                'category'        => '733',
                'subject'         => '2025年度會員大會',
                'content'         => '<p>本會將舉辦2025年度會員大會，請各位會員踴躍參加。</p>',
                'target_audience' => '全部會員',
                'has_attachment'  => false,
                'has_photo'       => true,
                'photo'           => '/announcement_files/s2026072213350710.png',
                'photo_w'         => 1024,
                'photo_h'         => 824,
                'external_link'   => 'https://gudate.com/2236/3904',
                'event_status'    => '即將開始',
                'views'           => 0,
                'note'            => null,
            ],
            [
                'language'        => 'TS',
                'status'          => true,
                'sort_order'      => 3,
                'published_date'  => '2026-07-22',
                'end_date'        => '2200-12-31',
                'category'        => '1',
                'subject'         => '國際同濟會臺灣總會年會',
                'content'         => '<p>國際同濟會臺灣總會年會即將舉行，歡迎各分會踴躍參加。</p>',
                'target_audience' => '全部會員',
                'has_attachment'  => false,
                'has_photo'       => true,
                'photo'           => '/announcement_files/s2026072213350710.png',
                'photo_w'         => 1024,
                'photo_h'         => 824,
                'external_link'   => 'https://gudate.com/2236/3903',
                'event_status'    => '活動結束',
                'views'           => 0,
                'note'            => null,
            ],
        ];

        foreach ($announcements as $data) {
            MemberAnnouncement::create($data);
        }
    }
}
