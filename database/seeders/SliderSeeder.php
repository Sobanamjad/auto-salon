<?php

namespace Database\Seeders;

use App\Models\Slider;
use Illuminate\Database\Seeder;

class SliderSeeder extends Seeder
{
    public function run()
    {
        $sliders = [
            [
                'language' => 'TS',
                'title' => '永康國際同濟會',
                'image' => 'b2026072114130420.png',
                'image_alt' => '永康國際同濟會',
                'link' => null,
                'sort_order' => 1,
                'is_active' => true,
                'width' => 1920,
                'height' => 699,
                'video_url' => null,
                'description' => '首頁輪播圖片 1',
            ],
            [
                'language' => 'TS',
                'title' => '永康國際同濟會',
                'image' => 'b2026072113511750.png',
                'image_alt' => '永康國際同濟會',
                'link' => null,
                'sort_order' => 2,
                'is_active' => true,
                'width' => 1920,
                'height' => 700,
                'video_url' => null,
                'description' => '首頁輪播圖片 2',
            ],
            [
                'language' => 'TS',
                'title' => '永康國際同濟會',
                'image' => 'b2026072117103560.png',
                'image_alt' => '永康國際同濟會',
                'link' => null,
                'sort_order' => 3,
                'is_active' => true,
                'width' => 1920,
                'height' => 700,
                'video_url' => null,
                'description' => '首頁輪播圖片 3',
            ],
        ];

        foreach ($sliders as $item) {
            Slider::create($item);
        }
    }
}