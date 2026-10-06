<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('member_announcements', function (Blueprint $table) {
            $table->string('category')->nullable()->after('language');       // 733=本會活動, 1=總會活動, 2=好友的活動
            $table->string('photo')->nullable()->after('has_photo');
            $table->integer('photo_w')->nullable()->after('photo');
            $table->integer('photo_h')->nullable()->after('photo_w');
            $table->string('external_link')->nullable()->after('photo_h');   // gudate.com link
            $table->string('event_status')->default('報名期間')->after('external_link'); // 報名期間/即將開始/活動結束/進行中
        });
    }

    public function down(): void
    {
        Schema::table('member_announcements', function (Blueprint $table) {
            $table->dropColumn(['category', 'photo', 'photo_w', 'photo_h', 'external_link', 'event_status']);
        });
    }
};
