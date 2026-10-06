<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('member_id');         // FK to members
            $table->string('member_no')->nullable();         // 會員編號 (for display)
            $table->string('member_name')->nullable();       // 會員姓名 (snapshot)
            $table->string('period');                        // 期別 e.g. 2026
            $table->decimal('amount', 10, 2)->default(0);   // 應繳金額
            $table->decimal('paid_amount', 10, 2)->default(0); // 實繳金額
            $table->date('due_date')->nullable();            // 繳費截止日
            $table->date('paid_date')->nullable();           // 實際繳費日
            $table->string('payment_method')->nullable();   // 繳費方式: 現金/匯款/信用卡
            $table->string('receipt_no')->nullable();        // 收據號碼
            $table->string('status')->default('unpaid');    // unpaid/paid/overdue/exempted
            $table->text('remark')->nullable();              // 備註
            $table->unsignedBigInteger('created_by')->nullable(); // 操作者
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('member_id')->references('id')->on('members')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
