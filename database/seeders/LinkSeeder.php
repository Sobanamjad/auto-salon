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
                'category' => '899',
                'title' => '國際同濟會台灣總會',
                'url' => 'https://www.kiwanis.org.tw/',
                'content' => null,
                'note' => null,
                'has_photo' => true,
                'img' => '/asd_files/s20260722143043100.png',
                'img_w' => 1024,
                'img_h' => 1024,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'show_on_sidebar' => true,
                'sort_order' => 2,
                'category' => '899',
                'title' => '同濟新聞台',
                'url' => 'https://www.youtube.com/@%E5%90%8C%E6%BF%9F%E6%96%B0%E8%81%9E%E5%8F%B0',
                'content' => null,
                'note' => null,
                'has_photo' => true,
                'img' => '/asd_files/s2026072214362130.png',
                'img_w' => 1024,
                'img_h' => 1024,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'show_on_sidebar' => true,
                'sort_order' => 3,
                'category' => '899',
                'title' => '網路硬碟',
                'url' => 'https://drive.google.com/drive/folders/0B1BHPOKkSSugZUFEckM3RTZjYkE?resourcekey=0-UgELiJx818yBj1p6SyfvnQ',
                'content' => null,
                'note' => null,
                'has_photo' => true,
                'img' => '/asd_files/s2026072214383290.png',
                'img_w' => 1024,
                'img_h' => 1024,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'show_on_sidebar' => true,
                'sort_order' => 4,
                'category' => '900',
                'title' => '台南市政府',
                'url' => 'https://www.tainan.gov.tw/Default.aspx',
                'content' => null,
                'note' => null,
                'has_photo' => true,
                'img' => '/asd_files/s202507251351370.png',
                'img_w' => 1024,
                'img_h' => 600,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'show_on_sidebar' => true,
                'sort_order' => 5,
                'category' => '899',
                'title' => '商務夥伴協會',
                'url' => 'https://b-partner.org/',
                'content' => null,
                'note' => null,
                'has_photo' => true,
                'img' => '/asd_files/s2026071314025490.png',
                'img_w' => 1024,
                'img_h' => 1024,
            ],
        ];

        foreach ($links as $link) {
            Link::create($link);
        }
    }
}