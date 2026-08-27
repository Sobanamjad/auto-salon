<?php

namespace Database\Seeders;

use App\Models\Director;
use Illuminate\Database\Seeder;

class DirectorSeeder extends Seeder
{
    public function run()
    {
        $directors = [
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'sort_order' => 1,
                'published_date' => '2026-08-27',
                'end_date' => '2200-12-31',
                'category' => '現任會長',
                'title' => '第7屆會長',
                'name' => '林明月',
                'brief' => '現任會長，帶領協會邁向新里程碑',
                'content' => '<p>第7屆會長 林明月</p><p>致力於協會發展與會員服務。</p>',
                'has_photo' => true,
                'views' => 7,
                'note' => '',
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'sort_order' => 2,
                'published_date' => '2026-08-27',
                'end_date' => '2200-12-31',
                'category' => '歷屆會長',
                'title' => '第6屆會長',
                'name' => '吳炯華',
                'brief' => '第6屆會長，貢獻良多',
                'content' => '<p>第6屆會長 吳炯華</p><p>任內推動多項會務改革。</p>',
                'has_photo' => true,
                'views' => 7,
                'note' => '',
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'sort_order' => 3,
                'published_date' => '2026-08-27',
                'end_date' => '2200-12-31',
                'category' => '理監事',
                'title' => '理事',
                'name' => '蔣晴',
                'brief' => '理事，熱心會務',
                'content' => '<p>理事 蔣晴</p><p>積極參與協會各項活動。</p>',
                'has_photo' => true,
                'views' => 6,
                'note' => '',
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'sort_order' => 4,
                'published_date' => '2026-08-27',
                'end_date' => '2200-12-31',
                'category' => '理監事',
                'title' => '理事',
                'name' => '黃學斌',
                'brief' => '理事，專業諮詢',
                'content' => '<p>理事 黃學斌</p><p>提供專業建議與諮詢。</p>',
                'has_photo' => true,
                'views' => 7,
                'note' => '',
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'sort_order' => 5,
                'published_date' => '2026-08-27',
                'end_date' => '2200-12-31',
                'category' => '理監事',
                'title' => '監事',
                'name' => '曾小化',
                'brief' => '監事，監督會務',
                'content' => '<p>監事 曾小化</p><p>確保協會運作透明公正。</p>',
                'has_photo' => true,
                'views' => 2,
                'note' => '',
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'sort_order' => 6,
                'published_date' => '2026-08-27',
                'end_date' => '2200-12-31',
                'category' => '理監事',
                'title' => '理事',
                'name' => '江辰辰',
                'brief' => '理事，活動策劃',
                'content' => '<p>理事 江辰辰</p><p>負責協會活動策劃與執行。</p>',
                'has_photo' => true,
                'views' => 3,
                'note' => '',
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'sort_order' => 7,
                'published_date' => '2026-08-27',
                'end_date' => '2200-12-31',
                'category' => '顧問團',
                'title' => '顧問',
                'name' => '張顧問',
                'brief' => '協會顧問，提供策略指導',
                'content' => '<p>顧問 張顧問</p><p>提供協會發展策略指導。</p>',
                'has_photo' => true,
                'views' => 5,
                'note' => '',
            ],
        ];

        foreach ($directors as $director) {
            Director::create($director);
        }
    }
}