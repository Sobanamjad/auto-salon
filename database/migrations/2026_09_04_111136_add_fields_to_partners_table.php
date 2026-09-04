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
        Schema::table('partners', function (Blueprint $table) {
            $table->string('image')->nullable();
            $table->string('slogan')->nullable();
            $table->string('tag')->nullable();
            $table->string('external_link')->nullable();
            $table->string('company_name')->nullable();
            $table->string('booking_link')->nullable();
            $table->string('take_number_link')->nullable();
            $table->string('current_number_link')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('partners', function (Blueprint $table) {
            $table->dropColumn([
                'image',
                'slogan',
                'tag',
                'external_link',
                'company_name',
                'booking_link',
                'take_number_link',
                'current_number_link'
            ]);
        });
    }
};
