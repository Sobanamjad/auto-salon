<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('member_announcements', function (Blueprint $table) {
            $table->id();
            $table->string('language', 2)->default('TS');
            $table->string('category')->nullable(); // 733=本會活動, 1=總會活動, 2=好友的活動
            $table->boolean('status')->default(true);
            $table->integer('sort_order')->default(999);
            $table->date('published_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('subject');
            $table->longText('content');
            $table->string('target_audience')->nullable();
            $table->boolean('has_attachment')->default(false);
            $table->boolean('has_photo')->default(false);
            $table->string('photo')->nullable();
            $table->integer('photo_w')->nullable();
            $table->integer('photo_h')->nullable();
            $table->string('external_link')->nullable(); // gudate.com link
            $table->string('event_status')->default('報名期間'); // 報名期間/即將開始/活動結束/進行中
            $table->integer('views')->default(0);
            $table->text('note')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('member_announcements');
    }
};