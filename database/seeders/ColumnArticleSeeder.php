<?php

namespace Database\Seeders;

use App\Models\ColumnArticle;
use Illuminate\Database\Seeder;

class ColumnArticleSeeder extends Seeder
{
    public function run()
    {
        $articles = [
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'sort_order' => 1,
                'published_date' => '2026-07-14',
                'end_date' => '2200-12-31',
                'category' => '社團達人-社團展示',
                'subject' => '社團幹部們的惡夢：除了熱血，我們還剩下什麼？',
                'brief' => '探討社團幹部在經營社團時面臨的挑戰與困境',
                'content' => '<p>社團幹部們的惡夢：除了熱血，我們還剩下什麼？</p><p>詳細內容...</p>',
                'keyword' => '社團幹部',
                'has_photo' => true,
                'views' => 26,
                'platform_category' => null,
                'join_platform' => false,
                'note' => '',
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'sort_order' => 2,
                'published_date' => '2026-07-14',
                'end_date' => '2200-12-31',
                'category' => '社團達人-社團展示',
                'subject' => '社團交接的最終章：除了數位迷宮，還有堆成山的「墳場」?',
                'brief' => '探討社團交接時遇到的數位資料傳承問題',
                'content' => '<p>社團交接的最終章：除了數位迷宮，還有堆成山的「墳場」?</p><p>詳細內容...</p>',
                'keyword' => '社團交接',
                'has_photo' => true,
                'views' => 28,
                'platform_category' => null,
                'join_platform' => false,
                'note' => '',
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'sort_order' => 3,
                'published_date' => '2026-07-14',
                'end_date' => '2200-12-31',
                'category' => '社團達人-社團展示',
                'subject' => '別讓行政瑣事，成為你社團經營的絆腳石',
                'brief' => '分享如何有效管理社團行政事務',
                'content' => '<p>別讓行政瑣事，成為你社團經營的絆腳石</p><p>詳細內容...</p>',
                'keyword' => '行政瑣事',
                'has_photo' => true,
                'views' => 22,
                'platform_category' => null,
                'join_platform' => false,
                'note' => '',
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'sort_order' => 4,
                'published_date' => '2026-07-14',
                'end_date' => '2200-12-31',
                'category' => '社團達人-社團展示',
                'subject' => '有哪些方法可以提高社團的參與度?',
                'brief' => '分享提高社團參與度的實用方法',
                'content' => '<p>有哪些方法可以提高社團的參與度?</p><p>詳細內容...</p>',
                'keyword' => '參與度',
                'has_photo' => false,
                'views' => 37,
                'platform_category' => '會友專欄',
                'join_platform' => true,
                'note' => '',
            ],
        ];

        foreach ($articles as $article) {
            ColumnArticle::create($article);
        }
    }
}