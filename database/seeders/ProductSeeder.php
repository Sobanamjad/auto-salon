<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'sort_order' => 1,
                'published_date' => '2026-08-25',
                'end_date' => '2200-12-31',
                'category' => '吃吃喝喝',
                'product_no' => 'P001',
                'name' => '花菓酥禮盒 | 綜合花果酥禮盒',
                'brief' => '精選花果酥禮盒，送禮自用兩相宜',
                'content' => '<p>花菓酥禮盒 - 綜合花果酥禮盒</p><p>精選多種花果口味，酥脆可口。</p>',
                'video' => null,
                'note' => '',
                'has_photo' => true,
                'views' => 1,
                'price' => 'NT$399',
                'currency' => 'NT',
                'stock' => 100,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => true,
                'sort_order' => 2,
                'published_date' => '2026-08-25',
                'end_date' => '2200-12-31',
                'category' => '居家用品',
                'product_no' => 'P002',
                'name' => '室翲香白色小粒萘丸450g',
                'brief' => '天然防蟲除臭，居家必備',
                'content' => '<p>室翲香白色小粒萘丸450g</p><p>天然防蟲除臭，持久有效。</p>',
                'video' => null,
                'note' => '',
                'has_photo' => true,
                'views' => 1,
                'price' => 'NT$199',
                'currency' => 'NT',
                'stock' => 50,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'sort_order' => 3,
                'published_date' => '2026-08-25',
                'end_date' => '2200-12-31',
                'category' => '居家用品',
                'product_no' => 'P003',
                'name' => '室翲香大粒萘丸量販包1000g',
                'brief' => '大容量防蟲包，經濟實惠',
                'content' => '<p>室翲香大粒萘丸量販包1000g</p><p>大容量包裝，全家適用。</p>',
                'video' => null,
                'note' => '',
                'has_photo' => true,
                'views' => 1,
                'price' => 'NT$299',
                'currency' => 'NT',
                'stock' => 30,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'sort_order' => 4,
                'published_date' => '2026-08-25',
                'end_date' => '2200-12-31',
                'category' => '保養飾品',
                'product_no' => 'P004',
                'name' => '純銀易扣耳環2',
                'brief' => '純銀材質，易扣設計，時尚百搭',
                'content' => '<p>純銀易扣耳環</p><p>925純銀，舒適佩戴。</p>',
                'video' => null,
                'note' => '',
                'has_photo' => true,
                'views' => 1,
                'price' => 'NT$499',
                'currency' => 'NT',
                'stock' => 20,
            ],
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'sort_order' => 5,
                'published_date' => '2026-08-25',
                'end_date' => '2200-12-31',
                'category' => '保養飾品',
                'product_no' => 'P005',
                'name' => '純銀易扣耳環',
                'brief' => '經典純銀耳環，簡約設計',
                'content' => '<p>純銀易扣耳環</p><p>簡約時尚，日常佩戴。</p>',
                'video' => null,
                'note' => '',
                'has_photo' => true,
                'views' => 1,
                'price' => 'NT$399',
                'currency' => 'NT',
                'stock' => 25,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}