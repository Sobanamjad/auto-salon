<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('member_no')->unique()->nullable();
            $table->string('name');
            $table->string('gender')->nullable(); // 先生/小姐
            $table->string('phone')->nullable();
            $table->string('mobile')->nullable();
            $table->string('email')->nullable();
            $table->string('username')->unique()->nullable();
            $table->string('password')->nullable();
            $table->string('company')->nullable();
            $table->string('position')->nullable();
            $table->string('school')->nullable();
            $table->string('department')->nullable();
            $table->string('category')->nullable(); // 水電工程, 資訊科技, 房屋交易
            $table->string('category2')->nullable();
            $table->string('member_type')->nullable(); // 正式會員, 準會員, 永久會員
            $table->string('position_in_association')->nullable(); // 本屆職稱
            $table->string('affiliated_unit')->nullable(); // 所屬單位
            $table->date('period_start')->nullable();
            $table->date('period_end')->nullable();
            $table->decimal('fee', 10, 2)->nullable();
            $table->text('note')->nullable();
            $table->integer('sort_order')->default(99);
            $table->boolean('status')->default(true);
            $table->integer('views')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('members');
    }
};