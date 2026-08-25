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
        Schema::create('abouts', function (Blueprint $table) {
            $table->id();
            $table->string('language')->default('TS');
            $table->boolean('status')->default(true);
            $table->boolean('show_on_home')->default(true);
            $table->integer('sort_order')->default(999);
            $table->string('category')->nullable();
            $table->string('subject');
            $table->text('brief')->nullable();
            $table->text('content');
            $table->string('image')->nullable();
            $table->text('video')->nullable();
            $table->text('note')->nullable();
            $table->date('issuedate')->nullable();
            $table->date('enddate')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abouts');
    }
};
