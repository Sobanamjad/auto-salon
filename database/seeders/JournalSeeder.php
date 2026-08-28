<?php

namespace Database\Seeders;

use App\Models\Journal;
use Illuminate\Database\Seeder;

class JournalSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'account_subject' => '1108 應收收入',
                'serial_no' => '2026082815090810',
                'invoice_no' => 'INV-20260001',
                'invoice_date' => '2026-08-28',
                'transaction_date' => '2026-08-28',
                'customer_name' => '王小明',
                'customer_vat' => '12345678',
                'amount' => 5000,
                'type' => 'income',
                'summary' => '會員年費收入',
                'is_invoice_encrypted' => false,
                'invoice_password' => null,
                'remark' => '正常繳費',
            ],
            [
                'account_subject' => '1118 其他支出',
                'serial_no' => '2026082715090820',
                'invoice_no' => 'INV-20260002',
                'invoice_date' => '2026-08-27',
                'transaction_date' => '2026-08-27',
                'customer_name' => '文具行',
                'customer_vat' => '87654321',
                'amount' => 1500,
                'type' => 'expense',
                'summary' => '辦公室文具用品',
                'is_invoice_encrypted' => false,
                'invoice_password' => null,
                'remark' => '8月份文具',
            ],
            [
                'account_subject' => '1114 營業收入',
                'serial_no' => '2026082615090830',
                'invoice_no' => 'INV-20260003',
                'invoice_date' => '2026-08-26',
                'transaction_date' => '2026-08-26',
                'customer_name' => '李老闆',
                'customer_vat' => '45678912',
                'amount' => 3000,
                'type' => 'income',
                'summary' => '活動贊助',
                'is_invoice_encrypted' => true,
                'invoice_password' => '2026082615090830',
                'remark' => '中秋活動贊助',
            ],
            [
                'account_subject' => '1116 管理費用',
                'serial_no' => '2026082515090840',
                'invoice_no' => 'INV-20260004',
                'invoice_date' => '2026-08-25',
                'transaction_date' => '2026-08-25',
                'customer_name' => '電信公司',
                'customer_vat' => '78912345',
                'amount' => 800,
                'type' => 'expense',
                'summary' => '電話費',
                'is_invoice_encrypted' => false,
                'invoice_password' => null,
                'remark' => '8月份電話費',
            ],
        ];

        foreach ($data as $item) {
            Journal::create($item);
        }
    }
}