<?php

namespace Database\Seeders;

use App\Models\Organization;
use Illuminate\Database\Seeder;

class OrganizationSeeder extends Seeder
{
    public function run()
    {
        $organizations = [
            [
                'name' => '社團達人-社團展示',
                'city' => '台南市',
                'district' => '仁德區',
                'village' => '文賢里',
                'address' => '台南市仁德區文賢里XX路XX號',
                'website' => 'https://demo.b-partner.org',
                'total_views' => 2303,
                'purchased_space' => 976.56 * 1024 * 1024, // 976.56 MB
                'used_space' => 99.5 * 1024 * 1024, // 99.5 MB
                'line_card_space' => 50 * 1024 * 1024, // 50 MB
                'language' => 'TS',
                'contact_person' => '王小明',
                'contact_phone' => '0912-345-678',
                'contact_email' => 'demo@b-partner.org',
                'description' => '社團展示平台，提供社團資訊服務',
                'is_active' => true,
            ],
        ];

        foreach ($organizations as $item) {
            Organization::create($item);
        }
    }
}