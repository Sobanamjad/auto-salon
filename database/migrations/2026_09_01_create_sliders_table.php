// database/migrations/2026_09_01_create_sliders_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('sliders', function (Blueprint $table) {
            $table->id();
            $table->string('language', 10)->default('TS'); // 語系: TS, EN, JP
            $table->string('title')->nullable(); // 主題
            $table->string('image')->nullable(); // 相片路徑
            $table->string('image_alt')->nullable(); // 圖片替代文字
            $table->string('link')->nullable(); // 連結網址
            $table->integer('sort_order')->default(0); // 排序
            $table->boolean('is_active')->default(true); // 啟用狀態
            $table->integer('width')->default(1920); // 寬度
            $table->integer('height')->default(700); // 高度
            $table->string('video_url')->nullable(); // 影片網址
            $table->text('description')->nullable(); // 描述
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sliders');
    }
};