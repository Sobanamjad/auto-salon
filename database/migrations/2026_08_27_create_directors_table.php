<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('directors', function (Blueprint $table) {
            $table->id();
            $table->string('language', 2)->default('TS');
            $table->boolean('status')->default(true);
            $table->boolean('show_on_home')->default(false);
            $table->integer('sort_order')->default(999);
            $table->date('published_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('category')->nullable(); // 理監事, 現任會長, 歷屆會長, 顧問團
            $table->string('title'); // 職稱
            $table->string('name'); // 姓名
            $table->text('brief')->nullable();
            $table->longText('content')->nullable();
            $table->text('video')->nullable();
            $table->text('note')->nullable();
            $table->boolean('has_photo')->default(false);
            $table->integer('views')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('directors');
    }
};