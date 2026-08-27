// database/migrations/2026_08_27_create_topics_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('topics', function (Blueprint $table) {
            $table->id();
            $table->string('city')->nullable();
            $table->string('district')->nullable();
            $table->string('category')->nullable();
            $table->string('title');
            $table->text('content')->nullable();
            $table->integer('views')->default(0);
            $table->boolean('is_active')->default(true);
            $table->integer('right_sn')->default(260731);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('topics');
    }
};