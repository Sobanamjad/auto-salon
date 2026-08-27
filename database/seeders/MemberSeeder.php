<?php

namespace Database\Seeders;

use App\Models\Member;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MemberSeeder extends Seeder
{
    public function run()
    {
        $members = [
            [
                'member_no' => 'M001',
                'name' => '江辰辰',
                'gender' => '小姐',
                'phone' => '062667100',
                'mobile' => '0900111222',
                'email' => 'chenchen@example.com',
                'username' => 'chenchen',
                'company' => 'xxx有限公司',
                'position' => '執行長祕書',
                'category' => '水電工程',
                'member_type' => '正式會員',
                'position_in_association' => '理事',
                'sort_order' => 99,
                'status' => true,
            ],
            [
                'member_no' => 'M002',
                'name' => '曾小化',
                'gender' => '先生',
                'phone' => '062667100',
                'mobile' => '0911222333',
                'email' => 'xiaohua@example.com',
                'username' => 'xiaohua',
                'company' => 'xxx科技公司',
                'position' => '資訊組長',
                'category' => '資訊科技',
                'member_type' => '正式會員',
                'position_in_association' => '監事',
                'sort_order' => 99,
                'status' => true,
            ],
            [
                'member_no' => 'M003',
                'name' => '黃學斌',
                'gender' => '先生',
                'mobile' => '0922333444',
                'email' => 'xuebin@example.com',
                'username' => 'xuebin',
                'company' => 'xxx房屋',
                'position' => '企劃主管',
                'category' => '房屋交易',
                'member_type' => '正式會員',
                'position_in_association' => '理事',
                'sort_order' => 99,
                'status' => true,
            ],
            [
                'member_no' => 'M004',
                'name' => '蔣晴',
                'gender' => '小姐',
                'mobile' => '0933444555',
                'email' => 'qing@example.com',
                'username' => 'qing',
                'company' => 'xxx建設有限公司',
                'position' => '建築設計師',
                'category' => '房屋交易',
                'member_type' => '正式會員',
                'position_in_association' => '理事',
                'sort_order' => 99,
                'status' => true,
            ],
        ];

        foreach ($members as $member) {
            Member::create($member);
        }
    }
}