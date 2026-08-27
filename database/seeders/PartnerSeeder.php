<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
    {
        public function run()
        {
            $partners = [
                [
                    'language' => 'TS',
                    'status' => true,
                    'show_on_home' => true,
                    'sort_order' => 99,
                    'name' => '陳書偉',
                    'city' => '台中市',
                    'district' => '北屯區',
                    'village' => '平田里',
                    'brief' => '專業企業管理顧問公司',
                    'content' => '<p>專業企業管理顧問公司</p><p>提供企業管理諮詢服務。</p>',
                    'note' => '',
                    'views' => 5,
                ],
                [
                    'language' => 'TS',
                    'status' => true,
                    'show_on_home' => true,
                    'sort_order' => 99,
                    'name' => '梁俊仁',
                    'city' => '台中市',
                    'district' => '清水區',
                    'village' => '吳厝里',
                    'brief' => '最知己的肉品供應商',
                    'content' => '<p>最知己的肉品供應商</p><p>提供優質肉品。</p>',
                    'note' => '',
                    'views' => 3,
                ],
                [
                    'language' => 'TS',
                    'status' => true,
                    'show_on_home' => true,
                    'sort_order' => 99,
                    'name' => '高莉甄',
                    'city' => '台南市',
                    'district' => '東區',
                    'village' => '富裕里',
                    'brief' => '五星好評:網路規劃師/高莉甄',
                    'content' => '<p>網路規劃師</p><p>提供網路規劃與設計服務。</p>',
                    'note' => '',
                    'views' => 4,
                ],
                [
                    'language' => 'TS',
                    'status' => true,
                    'show_on_home' => true,
                    'sort_order' => 99,
                    'name' => '陳金漢',
                    'city' => '台南市',
                    'district' => '中西區',
                    'village' => '',
                    'brief' => '用心只為您',
                    'content' => '<p>用心只為您</p><p>提供專業服務。</p>',
                    'note' => '',
                    'views' => 6,
                ],
            ];

            foreach ($partners as $partner) {
                Partner::create($partner);
            }
        }
}