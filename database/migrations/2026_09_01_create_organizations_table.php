// database/migrations/2026_09_01_create_organizations_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // 公司名稱
            $table->string('city')->nullable(); // 城市
            $table->string('district')->nullable(); // 區
            $table->string('village')->nullable(); // 里
            $table->string('address')->nullable(); // 地址
            $table->string('website')->nullable(); // 網址
            $table->integer('total_views')->default(0); // 總點閱
            $table->bigInteger('purchased_space')->default(1024 * 1024 * 1024); // 購買空間 (bytes)
            $table->bigInteger('used_space')->default(0); // 目前使用 (bytes)
            $table->bigInteger('line_card_space')->default(50 * 1024 * 1024); // LINE名片空間 (50MB)
            $table->string('language')->default('TS'); // 語言: TS, EN, JP
            $table->string('contact_person')->nullable(); // 聯絡人
            $table->string('contact_phone')->nullable(); // 聯絡電話
            $table->string('contact_email')->nullable(); // 聯絡信箱
            $table->text('description')->nullable(); // 公司簡介
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('organizations');
    }
};