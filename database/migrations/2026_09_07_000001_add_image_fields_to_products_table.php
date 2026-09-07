<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('img')->nullable()->after('product_no');
            $table->integer('img_w')->nullable()->after('img');
            $table->integer('img_h')->nullable()->after('img_w');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['img', 'img_w', 'img_h']);
        });
    }
};
