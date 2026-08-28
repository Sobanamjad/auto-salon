<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('red_white', function (Blueprint $table) {
            $table->id();
            $table->string('category')->nullable(); // 分類: 喜事, 喪事, 會員開幕
            $table->string('person_name'); // 當事者
            $table->date('event_date_start')->nullable(); // 活動日起
            $table->date('event_date_end')->nullable(); // 活動日迄
            $table->string('attend_status')->nullable(); // 出席否
            $table->string('attendees')->nullable(); // 出席人員
            $table->decimal('amount', 10, 2)->default(0); // 款項
            $table->text('remark')->nullable(); // 備註
            $table->boolean('is_closed')->default(false); // 結案
            $table->integer('sort_order')->default(0); // 排序
            $table->integer('right_sn')->default(260751);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('red_white');
    }
};