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
                'title' => '輪撥1920*700',
                'image' => 's2026081210382010.png',
                'image_alt' => 'Slider 1',
                'link' => 'https://example.com',
                'sort_order' => 1,
                'is_active' => true,
                'width' => 1920,
                'height' => 700,
                'video_url' => null,
                'description' => '首頁輪播圖片 1',
            ],
            [
                'language' => 'TS',
                'title' => '輪撥1920*700',
                'image' => 's2026081210382011.png',
                'image_alt' => 'Slider 2',
                'link' => 'https://example.com',
                'sort_order' => 2,
                'is_active' => true,
                'width' => 1920,
                'height' => 700,
                'video_url' => null,
                'description' => '首頁輪播圖片 2',
            ],
        ];

        foreach ($sliders as $item) {
            Slider::create($item);
        }
    }
}