<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('job_postings', function (Blueprint $table) {
            $table->id();
            $table->string('language', 2)->default('TS');
            $table->boolean('status')->default(true);
            $table->boolean('show_on_home')->default(false);
            $table->integer('sort_order')->default(999);
            $table->date('published_start')->nullable();
            $table->date('published_end')->nullable();
            $table->string('job_no')->nullable();
            $table->string('company'); // 求才單位
            $table->string('contact_person')->nullable(); // 聯絡人
            $table->string('contact_gender')->nullable(); // 先生/小姐
            $table->string('contact_phone')->nullable();
            $table->string('contact_mobile')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_web')->nullable();
            $table->string('work_location')->nullable(); // 工作地點
            $table->string('work_area')->nullable(); // 所在地區
            $table->string('nearby_school_1')->nullable(); // 鄰近學校1
            $table->string('nearby_school_2')->nullable(); // 鄰近學校2
            $table->string('job_title'); // 職務名稱
            $table->string('salary')->nullable(); // 薪資待遇
            $table->string('work_hours')->nullable(); // 上班時段
            $table->string('vacancies')->nullable(); // 名額
            $table->string('job_category')->nullable(); // 職缺分類
            $table->longText('job_content')->nullable(); // 工作內容
            $table->longText('job_requirements')->nullable(); // 具備條件
            $table->text('note')->nullable();
            $table->integer('views')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('job_postings');
    }
};