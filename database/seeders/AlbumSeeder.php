<?php

namespace Database\Seeders;

use App\Models\Album;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AlbumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $albums = [
            [
                'title' => '2026年度春季會員大會',
                'slug' => '2026-annual-spring-meeting',
                'description' => '2026年度春季會員大會精彩花絮，包含會長致詞、會務報告及各項活動剪影。',
                'cover_image' => 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
                'album_date' => '2026-03-15',
                'category' => '年度活動',
                'status' => 'published',
                'is_featured' => true,
                'sort_order' => 1,
                'views' => 120,
                'photo_count' => 45,
                'comment_count' => 8,
            ],
            [
                'title' => '登山健行活動',
                'slug' => 'hiking-activity',
                'description' => '會員登山健行活動，大家一起享受大自然的美好風光。',
                'cover_image' => 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
                'album_date' => '2026-04-20',
                'category' => '會員活動',
                'status' => 'published',
                'is_featured' => false,
                'sort_order' => 2,
                'views' => 85,
                'photo_count' => 32,
                'comment_count' => 5,
            ],
            [
                'title' => '夏季露營活動',
                'slug' => 'summer-camping',
                'description' => '夏季露營活動的精彩時刻，會員們一起享受戶外生活的樂趣。',
                'cover_image' => 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
                'album_date' => '2026-07-10',
                'category' => '活動花絮',
                'status' => 'published',
                'is_featured' => true,
                'sort_order' => 3,
                'views' => 200,
                'photo_count' => 68,
                'comment_count' => 15,
            ],
            [
                'title' => '志工服務活動',
                'slug' => 'volunteer-service',
                'description' => '會員志工服務活動，回饋社會，傳遞愛心。',
                'cover_image' => 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
                'album_date' => '2026-05-25',
                'category' => '會員活動',
                'status' => 'published',
                'is_featured' => false,
                'sort_order' => 4,
                'views' => 95,
                'photo_count' => 28,
                'comment_count' => 3,
            ],
            [
                'title' => '秋季旅遊活動',
                'slug' => 'autumn-trip',
                'description' => '秋季旅遊活動，欣賞美景，增進會員間的友誼。',
                'cover_image' => 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
                'album_date' => '2026-10-15',
                'category' => '活動花絮',
                'status' => 'draft',
                'is_featured' => false,
                'sort_order' => 5,
                'views' => 0,
                'photo_count' => 0,
                'comment_count' => 0,
            ],
            [
                'title' => '聖誕節聯歡晚會',
                'slug' => 'christmas-party',
                'description' => '聖誕節聯歡晚會，會員們一起慶祝佳節。',
                'cover_image' => 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800',
                'album_date' => '2026-12-20',
                'category' => '年度活動',
                'status' => 'published',
                'is_featured' => true,
                'sort_order' => 6,
                'views' => 150,
                'photo_count' => 52,
                'comment_count' => 12,
            ],
            [
                'title' => '新年茶會',
                'slug' => 'new-year-tea-party',
                'description' => '新年茶會，會員們互相拜年，共度新春。',
                'cover_image' => 'https://images.unsplash.com/photo-1503376763036-066120622c74?w=800',
                'album_date' => '2027-01-10',
                'category' => '活動花絮',
                'status' => 'draft',
                'is_featured' => false,
                'sort_order' => 7,
                'views' => 0,
                'photo_count' => 0,
                'comment_count' => 0,
            ],
            [
                'title' => '春季野餐活動',
                'slug' => 'spring-picnic',
                'description' => '春季野餐活動，享受春日陽光，增進會員情誼。',
                'cover_image' => 'https://images.unsplash.com/photo-1568607688298-68499558d95b?w=800',
                'album_date' => '2027-03-25',
                'category' => '會員活動',
                'status' => 'published',
                'is_featured' => false,
                'sort_order' => 8,
                'views' => 65,
                'photo_count' => 24,
                'comment_count' => 4,
            ],
        ];

        foreach ($albums as $album) {
            Album::create($album);
        }
    }
}
