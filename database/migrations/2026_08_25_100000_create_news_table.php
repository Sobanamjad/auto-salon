<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->dateTime('published_date');
            $table->date('end_date')->default('2200-12-31');
            $table->boolean('status')->default(true);
            $table->boolean('show_on_home')->default(false);
            $table->boolean('show_marquee')->default(false);
            $table->integer('sort_order')->default(999);
            $table->string('category')->default('3595');
            $table->string('subject');
            $table->text('brief')->nullable();
            $table->text('content');
            $table->string('keyword')->nullable();
            $table->string('video')->nullable();
            $table->string('map')->nullable();
            $table->text('note')->nullable();
            $table->integer('views')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
