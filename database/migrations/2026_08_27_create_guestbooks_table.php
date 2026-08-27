<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('guestbooks', function (Blueprint $table) {
            $table->id();
            $table->string('language', 2)->default('TS');
            $table->boolean('status')->default(true);
            $table->integer('sort_order')->default(999);
            $table->date('published_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('category')->nullable();
            $table->string('question');
            $table->text('brief')->nullable();
            $table->longText('answer')->nullable();
            $table->date('question_date')->nullable();
            $table->date('answer_date')->nullable();
            $table->string('asker_name')->nullable();
            $table->string('asker_company')->nullable();
            $table->string('asker_mobile')->nullable();
            $table->string('asker_phone')->nullable();
            $table->string('asker_fax')->nullable();
            $table->string('asker_email')->nullable();
            $table->string('asker_line')->nullable();
            $table->string('asker_wechat')->nullable();
            $table->string('asker_whatsapp')->nullable();
            $table->string('asker_country')->nullable();
            $table->text('asker_note')->nullable();
            $table->text('note')->nullable();
            $table->boolean('has_photo')->default(false);
            $table->integer('views')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('guestbooks');
    }
};