<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        News::truncate();

        $items = [
            [
                'published_date' => '2025-10-05 00:00:00',
                'end_date'       => '2200-12-31',
                'status'         => true,
                'show_on_home'   => true,
                'show_marquee'   => true,
                'sort_order'     => 999,
                'category'       => '3603',
                'photo'          => '/news_files/s2026072210534540.jpg',
                'subject'        => '以團結為名、以服務為行　永康同濟會跨夜送暖花蓮',
                'brief'          => '永康同濟會秉持「服務人群、造福社會」的宗旨，於10月4日晚間11點啟程前往花蓮縣偏鄉地區，展開一場愛心捐贈的跨夜送暖行動。',
                'content'        => '
<p><img style="display:block;margin-left:auto;margin-right:auto;" src="https://uploads.posu.tw/22/2236/1784688713_0.jpg" alt="" width="600"></p>
<p><img style="display:block;margin-left:auto;margin-right:auto;" src="https://uploads.posu.tw/22/2236/1784688730_0.jpg" alt="" width="600"></p>
<p style="text-align:center;"><img src="https://uploads.posu.tw/22/2236/1784688751_0.jpg" alt="" width="600"></p>
<p><img style="display:block;margin-left:auto;margin-right:auto;" src="https://uploads.posu.tw/22/2236/1784688766_0.jpg" alt="" width="600"></p>
<p style="text-align:center;"><img src="https://uploads.posu.tw/22/2236/1784688810_0.jpg" alt="" width="600"></p>
<p>文：同濟記者/永康會 林頌恒<br>圖：永康會 會長 林頌恒 / 秘書長 梁晏誠<br><br>
永康同濟會秉持「服務人群、造福社會」的宗旨，於10月4日晚間11點由梁晏誠秘書長帶領，在林頌恒會長的指導與支持下，啟程前往花蓮縣偏鄉地區，展開一場愛心捐贈的跨夜送暖行動。<br><br>
此次捐贈物資包含酸痛貼布、高壓水管及多項生活用品，旨在協助當地居民改善生活條件，並關懷長期從事勞動及生活不便的族群。<br><br>
林頌恒會長表示，同濟精神的核心在於「團結與服務」，能在第一時間送上協助，是永康會的榮幸，也是應盡的責任。<br><br>
梁晏誠秘書長也感性指出，雖然行程緊湊、舟車勞頓，但當看到偏鄉居民露出真誠的笑容時，一切辛勞都化為值得。</p>',
                'keyword'        => '服務,公益,送暖',
                'video'          => null,
                'map'            => null,
                'note'           => null,
                'views'          => 12,
            ],
            [
                'published_date' => '2025-09-15 00:00:00',
                'end_date'       => '2200-12-31',
                'status'         => true,
                'show_on_home'   => true,
                'show_marquee'   => true,
                'sort_order'     => 998,
                'category'       => '3604',
                'photo'          => '/news_files/s2026072210451960.jpg',
                'subject'        => '國際同濟會臺灣總會澎嘉南區第50、51屆主席交接典禮',
                'brief'          => '澎嘉南區主席交接典禮圓滿成功，各地同濟會代表踴躍出席共同見證。',
                'content'        => '<p>國際同濟會臺灣總會澎嘉南區第50、51屆主席交接典禮於2025年9月15日圓滿舉行，場面盛大隆重，各地同濟會代表踴躍出席，共同見證這一歷史性時刻。</p>
<p>交接典禮在熱烈掌聲中進行，新任主席正式就任，表示將秉持同濟精神，積極推動各項公益活動與社會服務工作，為地區社會帶來更多正面影響。</p>',
                'keyword'        => '交接,主席,典禮',
                'video'          => null,
                'map'            => null,
                'note'           => null,
                'views'          => 8,
            ],
            [
                'published_date' => '2025-08-20 00:00:00',
                'end_date'       => '2200-12-31',
                'status'         => true,
                'show_on_home'   => true,
                'show_marquee'   => true,
                'sort_order'     => 997,
                'category'       => '3603',
                'photo'          => '/news_files/s2026072210425840.jpg',
                'subject'        => '永康同濟會會員一同參加嘉義阿里山同濟會的交接活動！',
                'brief'          => '永康同濟會會員踴躍參加嘉義阿里山同濟會的交接活動，展現跨地區深厚情誼。',
                'content'        => '<p>永康同濟會的會員們熱情響應，一同前往嘉義參加阿里山同濟會的交接活動，展現出同濟會員跨地區的深厚情誼與團結精神。</p>
<p>此次活動不僅加深了兩地同濟會之間的聯繫，也讓雙方會員有機會交流服務經驗，共同討論未來合作的可能性。</p>',
                'keyword'        => '交接,活動,會員',
                'video'          => null,
                'map'            => null,
                'note'           => null,
                'views'          => 7,
            ],
            [
                'published_date' => '2024-07-30 00:00:00',
                'end_date'       => '2200-12-31',
                'status'         => true,
                'show_on_home'   => true,
                'show_marquee'   => false,
                'sort_order'     => 996,
                'category'       => '3603',
                'photo'          => '/news_files/s2026072210323270.jpg',
                'subject'        => '國際同濟會24/07/30 於北台南家扶中心舉行愛心捐鞋聯合社服活動！',
                'brief'          => '本次活動由永康同濟會與多個分會聯合舉辦，共同為弱勢孩童送上關懷。',
                'content'        => '<p>國際同濟會於2024年7月30日在北台南家扶中心舉行愛心捐鞋聯合社服活動，活動圓滿成功，共集結多個同濟分會共同參與。</p>
<p>本次活動共捐出數百雙新鞋，送至有需要的弱勢家庭兒童，讓孩子們穿上合腳的鞋子，帶著滿滿的愛心踏上每一步。</p>',
                'keyword'        => '捐鞋,公益,社服',
                'video'          => null,
                'map'            => null,
                'note'           => null,
                'views'          => 15,
            ],
            [
                'published_date' => '2024-06-15 00:00:00',
                'end_date'       => '2200-12-31',
                'status'         => true,
                'show_on_home'   => false,
                'show_marquee'   => false,
                'sort_order'     => 995,
                'category'       => '3603',
                'photo'          => '/news_files/s2026072210194340.jpg',
                'subject'        => '永康會與澎嘉南區同濟會共同辦理反毒反暴力的籃球賽',
                'brief'          => '藉由籃球賽宣導反毒反暴力理念，結合體育活動與公益宣導，活動圓滿落幕。',
                'content'        => '<p>永康會與澎嘉南區同濟會攜手合作，共同辦理以「反毒反暴力」為主題的籃球賽，透過體育活動向青少年傳遞正確的價值觀。</p>
<p>活動在熱烈的氣氛中完美落幕，主辦單位表示，希望藉由此類活動，讓青少年在健康的環境中成長，遠離毒品與暴力的誘惑。</p>',
                'keyword'        => '籃球,反毒,公益',
                'video'          => null,
                'map'            => null,
                'note'           => null,
                'views'          => 10,
            ],
        ];

        foreach ($items as $item) {
            News::create($item);
        }
    }
}
