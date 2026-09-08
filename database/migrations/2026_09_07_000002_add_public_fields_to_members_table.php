<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('members', function (Blueprint $table) {
            $table->string('photo')->nullable()->after('note');
            $table->integer('photo_w')->nullable()->after('photo');
            $table->integer('photo_h')->nullable()->after('photo_w');
            $table->string('website')->nullable()->after('photo_h');
            $table->string('fax')->nullable()->after('website');
            $table->string('line_id')->nullable()->after('fax');
            $table->string('address')->nullable()->after('line_id');
            $table->longText('intro')->nullable()->after('address');
            // Additional phones (phone2, phone3) separate from existing phone/mobile
            $table->string('phone2')->nullable()->after('mobile');
            $table->string('phone3')->nullable()->after('phone2');
        });
    }

    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            $table->dropColumn([
                'photo', 'photo_w', 'photo_h',
                'website', 'fax', 'line_id', 'address', 'intro',
                'phone2', 'phone3',
            ]);
        });
    }
};
