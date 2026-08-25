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
        Schema::create('albums', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('cover_image')->nullable();
            $table->date('album_date')->nullable();
            $table->string('category')->default('活動花絮');
            $table->string('status')->default('published');
            $table->boolean('is_featured')->default(false);
            $table->integer('sort_order')->default(999);
            $table->integer('views')->default(0);
            $table->integer('photo_count')->default(0);
            $table->integer('comment_count')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('albums');
    }
};
