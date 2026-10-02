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
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->string('category')->nullable(); // 分類 (e.g., 加入問題)
            $table->string('question'); // 問題
            $table->longText('answer_html'); // 答案 (HTML format)
            $table->boolean('status')->default(true); // 狀態
            $table->integer('sort_order')->default(999); // 排序
            $table->integer('views')->default(0); // 點閱數
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faqs');
    }
};
