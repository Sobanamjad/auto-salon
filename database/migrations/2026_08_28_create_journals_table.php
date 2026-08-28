<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('journals', function (Blueprint $table) {
            $table->id();
            $table->string('account_subject')->nullable(); // 會計科目
            $table->string('serial_no')->unique(); // 序號/訂單編號
            $table->string('invoice_no')->nullable(); // 發票號碼
            $table->date('invoice_date')->nullable(); // 發票日期
            $table->date('transaction_date'); // 交易日
            $table->string('customer_name')->nullable(); // 客戶名稱
            $table->string('customer_vat')->nullable(); // 客戶統編
            $table->decimal('amount', 15, 2)->default(0); // 金額
            $table->enum('type', ['income', 'expense'])->default('income'); // 收入/支出
            $table->text('summary')->nullable(); // 摘要
            $table->boolean('is_invoice_encrypted')->default(false); // 收據加密
            $table->string('invoice_password')->nullable(); // 收據密碼
            $table->text('remark')->nullable(); // 備註
            $table->integer('right_sn')->default(260748);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('journals');
    }
};