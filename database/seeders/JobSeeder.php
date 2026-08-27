<?php

namespace Database\Seeders;

use App\Models\Job;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    public function run()
    {
        $jobs = [
            [
                'language' => 'TS',
                'status' => true,
                'show_on_home' => false,
                'sort_order' => 1,
                'published_start' => '2026-08-27',
                'published_end' => '2200-12-31',
                'job_no' => 'J001',
                'company' => '行政部',
                'contact_person' => '陳先生',
                'contact_gender' => '先生',
                'contact_phone' => '06-2667100',
                'contact_mobile' => '0912345678',
                'contact_email' => 'hr@company.com',
                'contact_web' => 'www.company.com',
                'work_location' => '台南市 仁德區',
                'work_area' => '台南市仁德區',
                'nearby_school_1' => '14', // 國立成功大學
                'nearby_school_2' => '11', // 崑山科技大學
                'job_title' => '行政專員[內容示意]',
                'salary' => '29500',
                'work_hours' => '09:00-18:00',
                'vacancies' => '2',
                'job_category' => '行政．法務．人資',
                'job_content' => '<p>1. 文件管理與歸檔</p><p>2. 行政事務處理</p><p>3. 主管交辦事項</p>',
                'job_requirements' => '<p>1. 大學以上學歷</p><p>2. 具備基本電腦文書能力</p><p>3. 細心、負責</p>',
                'note' => '福利優，年終獎金',
                'views' => 6,
            ],
        ];

        foreach ($jobs as $job) {
            Job::create($job);
        }
    }
}