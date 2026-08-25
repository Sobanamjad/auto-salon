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
            $table->boolean('status')->default(true);
            $table->integer('sort_order')->default(999);
            $table->date('published_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('subject');
            $table->longText('content');
            $table->string('target_audience')->nullable();
            $table->boolean('has_attachment')->default(false);
            $table->boolean('has_photo')->default(false);
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