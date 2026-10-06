<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('downloads', function (Blueprint $table) {
            $table->id();
            $table->string('language')->default('TS');
            $table->boolean('status')->default(true);
            $table->boolean('show_on_home')->default(false);
            $table->integer('sort_order')->default(0);
            $table->date('published_date')->nullable();
            $table->date('end_date')->nullable()->default('2200-12-31');
            $table->string('category')->nullable();       // 分類
            $table->string('title');                      // 標題
            $table->text('brief')->nullable();            // 說明
            $table->string('file_path')->nullable();      // 檔案路徑
            $table->string('file_name')->nullable();      // 原始檔名
            $table->string('file_type')->nullable();      // 副檔名 pdf/doc/xls...
            $table->unsignedBigInteger('file_size')->default(0); // bytes
            $table->string('ext_url')->nullable();        // 外部連結 (alternative to file)
            $table->boolean('has_photo')->default(false);
            $table->string('img')->nullable();
            $table->integer('img_w')->nullable();
            $table->integer('img_h')->nullable();
            $table->integer('views')->default(0);
            $table->string('note')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('downloads');
    }
};
