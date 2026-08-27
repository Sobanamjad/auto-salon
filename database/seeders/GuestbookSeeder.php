<?php

namespace Database\Seeders;

use App\Models\Guestbook;
use Illuminate\Database\Seeder;

class GuestbookSeeder extends Seeder
{
    public function run()
    {
        $guestbooks = [
            [
                'language' => 'TS',
                'status' => true,
                'sort_order' => 1,
                'published_date' => '2026-08-27',
                'end_date' => '2200-12-31',
                'category' => '一般問題',
                'question' => '如何加入協會？',
                'brief' => '想了解加入協會的流程',
                'answer' => '請填寫入會申請表，並繳交會費即可加入。',
                'question_date' => '2026-08-27',
                'answer_date' => '2026-08-27',
                'asker_name' => '王小明',
                'asker_company' => '科技公司',
                'asker_mobile' => '0912345678',
                'asker_phone' => '0223456789',
                'asker_email' => 'ming@example.com',
                'asker_line' => 'ming123',
                'asker_wechat' => 'ming_wechat',
                'asker_whatsapp' => '0912345678',
                'asker_country' => 'TAIWAN(台灣)',
                'asker_note' => '急件',
                'note' => '已回覆',
                'has_photo' => false,
                'views' => 5,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'sort_order' => 2,
                'published_date' => '2026-08-27',
                'end_date' => '2200-12-31',
                'category' => '活動諮詢',
                'question' => '近期有什麼活動？',
                'brief' => '想了解近期活動資訊',
                'answer' => '近期將舉辦中秋節聯歡晚會，請關注官網公告。',
                'question_date' => '2026-08-27',
                'answer_date' => '2026-08-27',
                'asker_name' => '陳小華',
                'asker_company' => '貿易公司',
                'asker_mobile' => '0923456789',
                'asker_phone' => '0334567890',
                'asker_email' => 'hua@example.com',
                'asker_line' => 'hua456',
                'asker_wechat' => 'hua_wechat',
                'asker_whatsapp' => '0923456789',
                'asker_country' => 'TAIWAN(台灣)',
                'asker_note' => '',
                'note' => '',
                'has_photo' => false,
                'views' => 3,
            ],
            [
                'language' => 'TS',
                'status' => false,
                'sort_order' => 3,
                'published_date' => '2026-08-27',
                'end_date' => '2200-12-31',
                'category' => '會費問題',
                'question' => '會費如何繳交？',
                'brief' => '想了解會費繳交方式',
                'answer' => '可透過銀行轉帳或現場繳交。',
                'question_date' => '2026-08-27',
                'answer_date' => '2026-08-27',
                'asker_name' => '林大偉',
                'asker_company' => '建設公司',
                'asker_mobile' => '0934567890',
                'asker_phone' => '0445678901',
                'asker_email' => 'wei@example.com',
                'asker_line' => 'wei789',
                'asker_wechat' => 'wei_wechat',
                'asker_whatsapp' => '0934567890',
                'asker_country' => 'TAIWAN(台灣)',
                'asker_note' => '',
                'note' => '待回覆',
                'has_photo' => false,
                'views' => 2,
            ],
        ];

        foreach ($guestbooks as $guestbook) {
            Guestbook::create($guestbook);
        }
    }
}