<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('column_articles', function (Blueprint $table) {
            $table->id();
            $table->string('language', 2)->default('TS');
            $table->boolean('status')->default(false);
            $table->boolean('show_on_home')->default(false);
            $table->integer('sort_order')->default(999);
            $table->date('published_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('category')->nullable();
            $table->string('subject');
            $table->text('brief')->nullable();
            $table->longText('content');
            $table->string('keyword', 10)->nullable();
            $table->text('video')->nullable();
            $table->text('map')->nullable();
            $table->text('note')->nullable();
            $table->boolean('has_photo')->default(false);
            $table->integer('views')->default(0);
            $table->string('platform_category')->nullable();
            $table->boolean('join_platform')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('column_articles');
    }
};