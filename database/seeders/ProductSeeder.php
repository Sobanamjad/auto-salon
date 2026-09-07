<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Category CSN codes match the public-facing category filter keys
        // 7519 = 保養飾品, 7518 = 居家用品, 7517 = 吃吃喝喝

        $xinzhanBadge =
            '<p><a href="https://www.xinzhansilver.com/product_view.php?id=69158" target="_blank" rel="noopener noreferrer">' .
            '<img style="float: left;" src="/asd_files/1783926018_0.png" alt="" width="200" /></a></p>';

        $xinzhanBadge2 =
            '<p><a href="https://www.xinzhansilver.com/product_view.php?id=69161" target="_blank" rel="noopener noreferrer">' .
            '<img style="float: left;" src="/asd_files/1783926018_0.png" alt="" width="200" /></a></p>';

        $peanutBadge =
            '<p><a href="https://www.peanut.com.tw/product_view.php?id=55256" target="_blank" rel="noopener noreferrer">' .
            '<img style="float: left;" src="/asd_files/1783926018_0.png" alt="" width="200" /></a></p>';

        $ichingBadge66482 =
            '<p><a href="https://shop.iching.com.tw/product_view.php?id=66482&cat=7246" target="_blank" rel="noopener noreferrer">' .
            '<img style="float: left;" src="/asd_files/1783926018_0.png" alt="" width="200" /></a></p>';

        $ichingBadge66486 =
            '<p><a href="https://shop.iching.com.tw/product_view.php?id=66486&cat=7246" target="_blank" rel="noopener noreferrer">' .
            '<img style="float: left;" src="/asd_files/1783926018_0.png" alt="" width="200" /></a></p>';

        $products = [
            [
                'language'       => 'TS',
                'status'         => true,
                'show_on_home'   => true,
                'sort_order'     => 1,
                'published_date' => '2026-07-22',
                'end_date'       => '2200-12-31',
                'category'       => '7519',          // 保養飾品
                'product_no'     => '28066',
                'img'            => '/asd_files/s2026072214160850.jpg',
                'img_w'          => 1024,
                'img_h'          => 1024,
                'name'           => '純銀易扣耳環2',
                'brief'          => '材質：925銀，外直徑約11mm',
                'content'        =>
                    '材質：925銀<br />' .
                    '外直徑尺寸：約11ｍｍ<br />' .
                    '內直徑尺寸：約8ｍｍ<br />' .
                    '水滴鑽尺寸：約6×4ｍｍ<br />' .
                    '圓鑽尺寸：約3ｍｍ<br />' .
                    '<br />' .
                    $xinzhanBadge,
                'video'      => null,
                'note'       => null,
                'has_photo'  => true,
                'views'      => 0,
                'price'      => null,
                'currency'   => 'NT',
                'stock'      => 0,
            ],
            [
                'language'       => 'TS',
                'status'         => true,
                'show_on_home'   => true,
                'sort_order'     => 2,
                'published_date' => '2026-07-22',
                'end_date'       => '2200-12-31',
                'category'       => '7519',          // 保養飾品
                'product_no'     => '28065',
                'img'            => '/asd_files/s20260722141549100.jpg',
                'img_w'          => 1024,
                'img_h'          => 1024,
                'name'           => '純銀易扣耳環',
                'brief'          => '材質：925銀，外直徑約10mm',
                'content'        =>
                    '材質：925銀<br />' .
                    '外直徑尺寸：約10ｍｍ<br />' .
                    '內直徑尺寸：約8ｍｍ<br />' .
                    '主體尺寸：約5×5×5ｍｍ<br />' .
                    '<br />' .
                    $xinzhanBadge2,
                'video'      => null,
                'note'       => null,
                'has_photo'  => true,
                'views'      => 0,
                'price'      => null,
                'currency'   => 'NT',
                'stock'      => 0,
            ],
            [
                'language'       => 'TS',
                'status'         => true,
                'show_on_home'   => false,
                'sort_order'     => 3,
                'published_date' => '2026-07-22',
                'end_date'       => '2200-12-31',
                'category'       => '7518',          // 居家用品
                'product_no'     => '28068',
                'img'            => '/asd_files/s2026072214170190.jpg',
                'img_w'          => 784,
                'img_h'          => 1024,
                'name'           => '室翲香白色小粒萘丸450g',
                'brief'          => '怡慶萘丸，採用高純度精萘製造，居家不可或缺的好幫手',
                'content'        =>
                    '怡慶萘丸，採用高純度精萘製造，產品多樣，<br />' .
                    '從傳統式的白色小萘丸、彩色萘丸，到各種不同形狀的萘丸<br />' .
                    '適用於衣櫥、抽屜、浴廁、貯藏室等空間，是居家不可或缺的好幫手。<br />' .
                    '1. 規格：450g(錠劑) / 包<br />' .
                    '2. 保存期限：兩年<br />' .
                    '3. 保存期限：2 年<br />' .
                    '<br />' .
                    $ichingBadge66482,
                'video'      => null,
                'note'       => null,
                'has_photo'  => true,
                'views'      => 0,
                'price'      => null,
                'currency'   => 'NT',
                'stock'      => 0,
            ],
            [
                'language'       => 'TS',
                'status'         => true,
                'show_on_home'   => false,
                'sort_order'     => 4,
                'published_date' => '2026-07-22',
                'end_date'       => '2200-12-31',
                'category'       => '7518',          // 居家用品
                'product_no'     => '28067',
                'img'            => '/asd_files/s2026072214163040.jpg',
                'img_w'          => 1024,
                'img_h'          => 1024,
                'name'           => '室翲香大粒萘丸量販包1000g',
                'brief'          => '量販包夾鍊設計，經濟實惠，便利好用',
                'content'        =>
                    '量販包夾鍊設計, 經濟實惠, 便利好用。<br />' .
                    '怡慶萘丸，採用高純度精萘製造，產品多樣，<br />' .
                    '從傳統式的白色小萘丸、彩色萘丸，到各種不同形狀的萘丸<br />' .
                    '適用於衣櫥、抽屜、浴廁、貯藏室等空間，是居家不可或缺的好幫手<br />' .
                    '1. 規格：1000g(錠劑) / 包<br />' .
                    '2. 箱裝入數：20 包<br />' .
                    '3. 保存期限：2 年<br />' .
                    '<br />' .
                    $ichingBadge66486,
                'video'      => null,
                'note'       => null,
                'has_photo'  => true,
                'views'      => 0,
                'price'      => null,
                'currency'   => 'NT',
                'stock'      => 0,
            ],
            [
                'language'       => 'TS',
                'status'         => true,
                'show_on_home'   => false,
                'sort_order'     => 5,
                'published_date' => '2026-07-22',
                'end_date'       => '2200-12-31',
                'category'       => '7517',          // 吃吃喝喝
                'product_no'     => '28069',
                'img'            => '/asd_files/s2026072214172740.jpg',
                'img_w'          => 928,
                'img_h'          => 1024,
                'name'           => '花菓酥禮盒 | 綜合花果酥禮盒',
                'brief'          => '綜合花菓酥禮盒含5種口味，麥芽花生脆餅完美結合',
                'content'        =>
                    '• 綜合花菓酥禮盒含花菓酥5種口味：仁平、芝麻、花生粉、椰子、海苔<br />' .
                    '• 綜合花菓酥禮盒採台灣本產9號花生製作<br />' .
                    '• 麥芽、花生、脆餅完美結合，酥脆不黏牙<br />' .
                    '• 綜合花菓酥禮盒機器全自動包裝，產品安全、衛生、美觀<br />' .
                    '• 綜合花菓酥禮盒採嚴選食材、天然原料，請放心食用<br />' .
                    '• 純素可用<br />' .
                    '• 產品成份：9號花生、麵粉、黑芝麻、海苔、椰子、麥芽、砂糖、玉米粉、杏仁、白芝麻<br />' .
                    '• 保存期限：2個月<br />' .
                    '• 產品規格：盒裝<br />' .
                    '<br />' .
                    $peanutBadge,
                'video'      => null,
                'note'       => null,
                'has_photo'  => true,
                'views'      => 0,
                'price'      => null,
                'currency'   => 'NT',
                'stock'      => 0,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
