<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('club_news', function (Blueprint $table) {
            $table->id();
            $table->string('language', 2)->default('TS');
            $table->string('title');
            $table->string('city')->nullable();
            $table->string('district')->nullable();
            $table->string('village')->nullable();
            $table->string('source')->nullable(); // 來源媒體
            $table->string('category')->nullable(); // 分類
            $table->text('content')->nullable();
            $table->integer('views')->default(0);
            $table->boolean('is_excluded')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('club_news');
    }
};