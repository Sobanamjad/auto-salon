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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category')->default('本會活動');
            $table->string('status')->default('開放報名');
            $table->date('date_start');
            $table->date('date_end');
            $table->date('signup_start')->nullable();
            $table->date('signup_end')->nullable();
            $table->boolean('is_open')->default(true);
            $table->text('content')->nullable();
            $table->integer('max_attendees')->default(0);
            $table->string('location')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('sort_order')->default(999);
            $table->integer('signup_count')->default(0);
            $table->integer('views')->default(0);
            $table->integer('checkin')->default(0);
            $table->integer('absent')->default(0);
            $table->integer('income')->default(0);
            $table->integer('expense')->default(0);
            $table->string('qa_status')->default('關閉中');
            $table->integer('qa_count')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
