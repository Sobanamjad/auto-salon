<?php

namespace Database\Seeders;

use App\Models\Job;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    public function run()
    {
        Job::create([
            'language' => 'TS',
            'status' => true,
            'show_on_home' => false,
            'sort_order' => 1,
            'published_start' => now(),
            'published_end' => '2200-12-31',
            'job_no' => '1100',
            'company' => '永康國際同濟會',
            'contact_person' => '陳 先生',
            'contact_gender' => '先生',
            'contact_phone' => '06-2667100',
            'contact_mobile' => null,
            'contact_email' => 'service@posu.com.tw',
            'contact_web' => 'http://posu.tw/',
            'work_location' => '本會',
            'work_area' => '台南市安平區',
            'nearby_school_1' => '嘉南藥理大學',
            'nearby_school_2' => null,
            'job_title' => '行政專員[內容示意]',
            'salary' => '29500',
            'work_hours' => 'am8:30-pm5:30',
            'vacancies' => null,
            'job_category' => '行政',
            'job_content' => '<p>[內容示意]</p><p>1.文件收發</p><p>2.會議記錄</p><p>3.行政庶務</p><p>4.電話接聽協助諮詢回覆與轉接對應部門</p><p>5.主管交辦事項</p>',
            'job_requirements' => '<p>1.熟電腦文書軟體</p><p>2.打字60字以上</p><p>3.台語流利</p><p>&nbsp;</p>',
            'note' => null,
            'views' => 0,
        ]);
    }
}
