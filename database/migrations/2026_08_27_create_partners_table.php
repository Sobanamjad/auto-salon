<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->string('language', 2)->default('TS');
            $table->boolean('status')->default(true);
            $table->boolean('show_on_home')->default(true);
            $table->integer('sort_order')->default(99);
            $table->string('name');
            $table->string('city')->nullable();
            $table->string('district')->nullable();
            $table->string('village')->nullable();
            $table->string('brief')->nullable();
            $table->longText('content')->nullable();
            $table->text('note')->nullable();
            $table->integer('views')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('partners');
    }
};