<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->string('language', 2)->default('TS');
            $table->boolean('status')->default(true);
            $table->boolean('show_on_home')->default(false);
            $table->boolean('show_on_sidebar')->default(true);
            $table->integer('sort_order')->default(999);
            $table->string('category')->nullable();
            $table->string('title');
            $table->string('url')->nullable();
            $table->longText('content')->nullable();
            $table->text('note')->nullable();
            $table->boolean('has_photo')->default(false);
            $table->string('img')->nullable();
            $table->integer('img_w')->nullable();
            $table->integer('img_h')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('links');
    }
};
