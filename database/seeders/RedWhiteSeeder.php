<?php

namespace Database\Seeders;

use App\Models\RedWhite;
use Illuminate\Database\Seeder;

class RedWhiteSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'category' => '喜事',
                'person_name' => '王小明',
                'event_date_start' => '2026-09-15',
                'event_date_end' => '2026-09-15',
                'attend_status' => '參加',
                'attendees' => '會長、副會長',
                'amount' => 2000,
                'remark' => '婚宴',
                'is_closed' => false,
                'sort_order' => 1,
            ],
            [
                'category' => '喪事',
                'person_name' => '陳阿公',
                'event_date_start' => '2026-08-20',
                'event_date_end' => '2026-08-22',
                'attend_status' => '致意',
                'attendees' => '秘書長',
                'amount' => 1100,
                'remark' => '告別式',
                'is_closed' => true,
                'sort_order' => 2,
            ],
            [
                'category' => '會員開幕',
                'person_name' => '李老闆',
                'event_date_start' => '2026-09-01',
                'event_date_end' => '2026-09-01',
                'attend_status' => '參加',
                'attendees' => '理監事',
                'amount' => 1500,
                'remark' => '新店開幕',
                'is_closed' => false,
                'sort_order' => 3,
            ],
        ];

        foreach ($data as $item) {
            RedWhite::create($item);
        }
    }
}