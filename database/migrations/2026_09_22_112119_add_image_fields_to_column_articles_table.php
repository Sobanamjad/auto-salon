<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('column_articles', function (Blueprint $table) {
            $table->string('img')->nullable()->after('has_photo');
            $table->integer('img_w')->nullable()->after('img');
            $table->integer('img_h')->nullable()->after('img_w');
        });
    }

    public function down(): void
    {
        Schema::table('column_articles', function (Blueprint $table) {
            $table->dropColumn(['img', 'img_w', 'img_h']);
        });
    }
};
