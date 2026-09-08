<?php

namespace Database\Seeders;

use App\Models\Member;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    public function run(): void
    {
        // category values are CSN codes matching the public /member route filter:
        // 307 = 水電工程, 303 = 資訊科技, 302 = 製造業

        $introZeng = '<p><strong>【個人簡介】</strong></p>'
            . '<p>擁有豐富的資訊系統整合與技術管理經驗，現任職於資訊科技業資訊組長。'
            . '專注於企業數位轉型、軟體開發生命週期（SDLC/SSDLC）管理、雲端架構維運與資訊安全防禦機制。</p>'
            . '<p>擅長將複雜的技術語言轉化為高效的業務解決方案，跨部門推動資訊系統的升級與優化。'
            . '著重於建立高穩定度、高擴充性且兼具安全性的IT基礎設施，協助企業在數位浪潮中保持關鍵競爭力。</p>'
            . '<p><strong>【核心專長】</strong></p>'
            . '<p>✦ 企業資訊系統架構與專案管理</p>'
            . '<p>✦ 軟體開發與資安防護（SSDLC / 滲透測試 / 資安防禦）</p>'
            . '<p>✦ 雲端服務與伺服器架構維運管理</p>'
            . '<p>✦ 跨部門溝通與技術團隊帶領</p>'
            . '<p><iframe style="display:table;margin-left:auto;margin-right:auto;" title="YouTube video player" '
            . 'src="https://www.youtube.com/embed/eLuOQ4m4Fcc?si=e1UL5_zS6HbtKdcA" width="560" height="315" '
            . 'frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" '
            . 'allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></p>';

        $members = [
            [
                'member_no'              => 'M001',
                'name'                   => '曾小化 [資料示意]',
                'gender'                 => '先生',
                'phone'                  => '062667100',
                'mobile'                 => '0911222333',
                'phone2'                 => '062667101',
                'email'                  => 'service@posu.com.tw',
                'company'                => 'xxx科技公司',
                'position'               => '資訊組長',
                'category'               => '303',   // 資訊科技
                'member_type'            => '正式會員',
                'position_in_association'=> '監事',
                'photo'                  => '/memmer_files/s2026072311244690.jpg',
                'photo_w'                => 1024,
                'photo_h'                => 1024,
                'website'                => 'https://www.posu.tw/',
                'fax'                    => '06-3662480',
                'line_id'                => 'posu80',
                'address'                => '台南市仁德區文賢路一段862巷8號',
                'intro'                  => $introZeng,
                'sort_order'             => 1,
                'status'                 => true,
                'views'                  => 0,
            ],
            [
                'member_no'              => 'M002',
                'name'                   => '王大明 [資料示意]',
                'gender'                 => '先生',
                'phone'                  => '06-2301234',
                'company'                => '臺南歸仁農會',
                'position'               => '',
                'category'               => '302',   // 製造業
                'member_type'            => '正式會員',
                'photo'                  => '/memmer_files/202607221414355319.png',
                'photo_w'                => 1024,
                'photo_h'                => 763,
                'sort_order'             => 2,
                'status'                 => true,
                'views'                  => 0,
            ],
            [
                'member_no'              => 'M003',
                'name'                   => '李小美 [資料示意]',
                'gender'                 => '小姐',
                'phone'                  => '06-3334444',
                'company'                => '微光藝宿',
                'position'               => '',
                'category'               => '307',   // 水電工程
                'member_type'            => '正式會員',
                'photo'                  => '/memmer_files/202607221414355319.png',
                'photo_w'                => 1024,
                'photo_h'                => 763,
                'sort_order'             => 3,
                'status'                 => true,
                'views'                  => 0,
            ],
            [
                'member_no'              => 'M004',
                'name'                   => '陳建國 [資料示意]',
                'gender'                 => '先生',
                'phone'                  => '06-5556666',
                'company'                => '佳和實業',
                'position'               => '',
                'category'               => '302',   // 製造業
                'member_type'            => '正式會員',
                'photo'                  => '/memmer_files/202607221414355319.png',
                'photo_w'                => 1024,
                'photo_h'                => 763,
                'sort_order'             => 4,
                'status'                 => true,
                'views'                  => 0,
            ],
        ];

        foreach ($members as $data) {
            Member::create($data);
        }
    }
}
