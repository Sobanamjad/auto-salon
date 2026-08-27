<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('timelines', function (Blueprint $table) {
            $table->id();
            $table->string('language', 2)->default('TS');
            $table->boolean('status')->default(true);
            $table->boolean('show_on_home')->default(true);
            $table->integer('sort_order')->default(999);
            $table->string('category')->nullable(); // 2025年, 2026年
            $table->date('event_date')->nullable();
            $table->string('title');
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
        Schema::dropIfExists('timelines');
    }
};