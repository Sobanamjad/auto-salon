<?php

namespace Database\Seeders;

use App\Models\Topic;
use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
    public function run()
    {
        $topics = [
            [
                'city' => '新北市',
                'district' => '',
                'category' => '愛心公益',
                'title' => '新北記者工會做公益助弱勢七年如一日　捐板橋社福中心急難救助金',
                'content' => '<p>新北記者工會連續7年做公益...</p>',
                'views' => 25,
            ],
            [
                'city' => '高雄市',
                'district' => '',
                'category' => '愛心公益',
                'title' => '豪雨狂炸南台灣　醫療用血告急 血庫僅剩3.7天',
                'content' => '<p>高雄捐血中心籲民眾挽袖救急...</p>',
                'views' => 32,
            ],
            // Add more sample data
        ];

        foreach ($topics as $topic) {
            Topic::create($topic);
        }
    }
}