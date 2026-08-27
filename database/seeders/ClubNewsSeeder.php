<?php

namespace Database\Seeders;

use App\Models\ClubNews;
use Illuminate\Database\Seeder;

class ClubNewsSeeder extends Seeder
{
    public function run()
    {
        $news = [
            [
                'language' => 'TS',
                'title' => '開啟職涯嶄新篇章！桃竹苗分署9月徵才熱力開跑',
                'city' => '桃園市',
                'district' => '桃園區',
                'village' => '',
                'source' => '視傳媒 - 地方新聞',
                'category' => '徵才活動',
                'content' => '<p>桃竹苗分署9月徵才熱力開跑，邀251家優質企業提供12917多元職缺。</p>',
                'is_excluded' => false,
                'views' => 25,
            ],
            [
                'language' => 'TS',
                'title' => '致敬黑夜中無名英雄！竹市府攜手空軍舉辦黑蝙蝠中隊75週年隊慶',
                'city' => '新竹市',
                'district' => '北區',
                'village' => '',
                'source' => '視傳媒 - 地方新聞',
                'category' => '軍事活動',
                'content' => '<p>竹市府攜手空軍舉辦黑蝙蝠中隊75週年隊慶，全台首創「劇本殺」沉浸式軍事特展。</p>',
                'is_excluded' => false,
                'views' => 18,
            ],
            [
                'language' => 'TS',
                'title' => '豪雨狂炸南台灣　醫療用血告急 血庫僅剩3.7天',
                'city' => '高雄市',
                'district' => '左營區',
                'village' => '',
                'source' => '視傳媒 - 地方新聞',
                'category' => '社會公益',
                'content' => '<p>高雄捐血中心籲民眾挽袖救急，醫療用血告急。</p>',
                'is_excluded' => false,
                'views' => 32,
            ],
            [
                'language' => 'TS',
                'title' => '經濟部產發署x故宮x中衛發展中心　啟動「金選台灣味」',
                'city' => '台北市',
                'district' => '中正區',
                'village' => '',
                'source' => '視傳媒 - 文教體育',
                'category' => '文創產業',
                'content' => '<p>推出60款全新故宮聯名文創商品，展現台灣味。</p>',
                'is_excluded' => false,
                'views' => 15,
            ],
        ];

        foreach ($news as $item) {
            ClubNews::create($item);
        }
    }
}