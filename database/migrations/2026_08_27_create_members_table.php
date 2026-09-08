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
            $table->string('gender')->nullable();
            $table->string('phone')->nullable();
            $table->string('mobile')->nullable();
            $table->string('phone2')->nullable();
            $table->string('phone3')->nullable();
            $table->string('email')->nullable();
            $table->string('username')->unique()->nullable();
            $table->string('password')->nullable();
            $table->string('company')->nullable();
            $table->string('position')->nullable();
            $table->string('school')->nullable();
            $table->string('department')->nullable();
            $table->string('category')->nullable();
            $table->string('category2')->nullable();
            $table->string('member_type')->nullable();
            $table->string('position_in_association')->nullable();
            $table->string('affiliated_unit')->nullable();
            $table->date('period_start')->nullable();
            $table->date('period_end')->nullable();
            $table->decimal('fee', 10, 2)->nullable();
            $table->text('note')->nullable();
            $table->string('photo')->nullable();
            $table->integer('photo_w')->nullable();
            $table->integer('photo_h')->nullable();
            $table->string('website')->nullable();
            $table->string('fax')->nullable();
            $table->string('line_id')->nullable();
            $table->string('address')->nullable();
            $table->longText('intro')->nullable();
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
