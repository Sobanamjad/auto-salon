<?php

namespace Database\Seeders;

use App\Models\About;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AboutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        About::create([
            'language' => 'TS',
            'status' => true,
            'show_on_home' => true,
            'sort_order' => 1,
            'category' => '社團達人-社團展示',
            'subject' => '成立宗旨',
            'brief' => '本會成立宗旨說明',
            'content' => '<p>本會成立宗旨說明內容...</p>',
            'image' => 'https://uploads.posu.tw/22/2226/s2026071010271530.png',
            'video' => null,
            'note' => null,
            'issuedate' => '2026-07-13',
            'enddate' => '2026-07-13',
        ]);

        About::create([
            'language' => 'TS',
            'status' => true,
            'show_on_home' => true,
            'sort_order' => 999,
            'category' => '社團達人-社團展示',
            'subject' => '組織章程',
            'brief' => '本會組織章程說明',
            'content' => '<p>本會組織章程說明內容...</p>',
            'image' => null,
            'video' => null,
            'note' => null,
            'issuedate' => '2026-07-13',
            'enddate' => '2026-07-13',
        ]);
    }
}
