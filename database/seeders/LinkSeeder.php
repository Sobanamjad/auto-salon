<?php

namespace Database\Seeders;

use App\Models\Link;
use Illuminate\Database\Seeder;

class LinkSeeder extends Seeder
{
    public function run()
    {
        $links = [
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'show_on_sidebar' => true,
                'sort_order' => 1,
                'category' => '政府單位',
                'title' => '台南市政府',
                'url' => 'https://www.tainan.gov.tw/Default.aspx',
                'content' => '<p>台南市政府官方網站</p>',
                'note' => '',
                'has_photo' => true,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'show_on_sidebar' => true,
                'sort_order' => 2,
                'category' => '本會相關',
                'title' => 'POSU官網',
                'url' => 'https://posu.tw',
                'content' => '<p>POSU官方網站</p>',
                'note' => '',
                'has_photo' => true,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'show_on_sidebar' => true,
                'sort_order' => 10,
                'category' => '友會',
                'title' => '國際獅子會300C-3區',
                'url' => 'https://www.300c3.org.tw',
                'content' => '<p>國際獅子會300C-3區官方網站</p>',
                'note' => '',
                'has_photo' => true,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'show_on_sidebar' => true,
                'sort_order' => 30,
                'category' => '友會',
                'title' => '高雄市商業會',
                'url' => 'https://www.kcoc.org.tw',
                'content' => '<p>高雄市商業會官方網站</p>',
                'note' => '',
                'has_photo' => true,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'show_on_sidebar' => true,
                'sort_order' => 40,
                'category' => '友會',
                'title' => '台南市商業總會',
                'url' => 'https://www.tncoc.com.tw/',
                'content' => '<p>台南市商業總會官方網站</p>',
                'note' => '',
                'has_photo' => true,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'show_on_sidebar' => true,
                'sort_order' => 50,
                'category' => '友會',
                'title' => '中華民國遊艇服務商業同業公會全國聯合會',
                'url' => 'https://ysbat.b-partner.org/',
                'content' => '<p>中華民國遊艇服務商業同業公會全國聯合會</p>',
                'note' => '',
                'has_photo' => true,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'show_on_sidebar' => true,
                'sort_order' => 999,
                'category' => '政府單位',
                'title' => '台南市觀光局',
                'url' => 'https://admin.twtainan.net/',
                'content' => '<p>台南市觀光局官方網站</p>',
                'note' => '',
                'has_photo' => true,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'show_on_sidebar' => true,
                'sort_order' => 999,
                'category' => '本會相關',
                'title' => '生活達人誌',
                'url' => 'https://life.posu.tw/',
                'content' => '<p>生活達人誌 - 豐富你的生活</p>',
                'note' => '',
                'has_photo' => true,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'show_on_sidebar' => true,
                'sort_order' => 999,
                'category' => '本會相關',
                'title' => '活動王',
                'url' => 'https://gudate.com',
                'content' => '<p>活動王 - 精彩活動盡在活動王</p>',
                'note' => '',
                'has_photo' => true,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'show_on_sidebar' => true,
                'sort_order' => 999,
                'category' => '本會相關',
                'title' => '商務夥伴協會',
                'url' => 'https://b-partner.org',
                'content' => '<p>商務夥伴協會官方網站</p>',
                'note' => '',
                'has_photo' => true,
            ],
        ];

        foreach ($links as $link) {
            Link::create($link);
        }
    }
}