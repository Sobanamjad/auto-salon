<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            AboutSeeder::class,
            AlbumSeeder::class,
            EventSeeder::class,
            NewsSeeder::class,
            MemberAnnouncementSeeder::class,
            ColumnArticleSeeder::class,
            ProductSeeder::class,
            DirectorSeeder::class,
            MemberSeeder::class,
            GuestbookSeeder::class,
            TimelineSeeder::class,
            PartnerSeeder::class,
            ClubNewsSeeder::class,
            RedWhiteSeeder::class,
            JournalSeeder::class,
            OrganizationSeeder::class,
        ]);
    }
}
