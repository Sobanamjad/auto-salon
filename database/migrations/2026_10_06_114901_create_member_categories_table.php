<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('member_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');                          // 分類名稱
            $table->string('name2')->nullable();             // 分類2名稱 (副分類)
            $table->string('color')->nullable()->default('bg-blue-100 text-blue-800');
            $table->string('icon')->nullable()->default('👤');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        // Default categories
        DB::table('member_categories')->insert([
            ['name' => '資訊科技', 'icon' => '💻', 'color' => 'bg-blue-100 text-blue-800',   'sort_order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => '房屋交易', 'icon' => '🏠', 'color' => 'bg-green-100 text-green-800',  'sort_order' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['name' => '水電工程', 'icon' => '🔧', 'color' => 'bg-yellow-100 text-yellow-800','sort_order' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['name' => '餐飲業',   'icon' => '🍽️', 'color' => 'bg-red-100 text-red-800',     'sort_order' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['name' => '醫療健康', 'icon' => '🏥', 'color' => 'bg-pink-100 text-pink-800',    'sort_order' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['name' => '教育文化', 'icon' => '📚', 'color' => 'bg-purple-100 text-purple-800','sort_order' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['name' => '金融保險', 'icon' => '💰', 'color' => 'bg-orange-100 text-orange-800','sort_order' => 7, 'created_at' => now(), 'updated_at' => now()],
            ['name' => '其他',     'icon' => '📋', 'color' => 'bg-gray-100 text-gray-700',    'sort_order' => 99,'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('member_categories');
    }
};
