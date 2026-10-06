<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('album_comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('album_id');       // FK to albums
            $table->string('commenter_name');             // 留言者姓名
            $table->string('commenter_email')->nullable();
            $table->text('content');                      // 留言內容
            $table->string('status')->default('pending'); // pending/approved/rejected
            $table->boolean('is_pinned')->default(false); // 置頂
            $table->string('ip_address')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('album_id')->references('id')->on('albums')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('album_comments');
    }
};
