<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('red_white_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');          // 分類名稱 e.g. 喜事, 喪事
            $table->string('icon')->nullable()->default('📋');  // emoji icon
            $table->string('color')->nullable()->default('bg-blue-100 text-blue-800'); // tailwind classes
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });

        // Default categories seed
        DB::table('red_white_categories')->insert([
            ['name' => '喜事',    'icon' => '🎉', 'color' => 'bg-red-100 text-red-800',    'sort_order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => '喪事',    'icon' => '🕊️', 'color' => 'bg-gray-100 text-gray-700',  'sort_order' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['name' => '會員開幕', 'icon' => '🏪', 'color' => 'bg-green-100 text-green-800','sort_order' => 3, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('red_white_categories');
    }
};
