// database/migrations/2026_09_01_add_profile_fields_to_users_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Personal Info
            $table->string('nickname')->nullable()->after('name');
            $table->string('phone1')->nullable()->after('email');
            $table->string('phone2')->nullable()->after('phone1');
            $table->string('email2')->nullable()->after('email');
            
            // Location
            $table->text('address')->nullable()->after('phone2');
            
            // Business
            $table->string('website')->nullable()->after('address');
            $table->string('working_hours')->nullable()->after('website');
            $table->string('slogan')->nullable()->after('working_hours');
            $table->text('brief')->nullable()->after('slogan');
            $table->longText('description')->nullable()->after('brief');
            $table->string('company_name')->nullable()->after('description');
            $table->string('vat_number')->nullable()->after('company_name');
            $table->string('fax')->nullable()->after('vat_number');
            $table->string('position')->nullable()->after('fax');
            
            // Bank
            $table->longText('bank_account')->nullable()->after('position');
            
            // Social Media
            $table->string('line_id')->nullable()->after('bank_account');
            $table->string('line_url')->nullable()->after('line_id');
            $table->integer('line_message_status')->default(0)->after('line_url');
            $table->string('line_channel_id')->nullable()->after('line_message_status');
            $table->string('line_access_token')->nullable()->after('line_channel_id');
            $table->string('line_secret')->nullable()->after('line_access_token');
            $table->string('line_user_id')->nullable()->after('line_secret');
            $table->string('wechat')->nullable()->after('line_user_id');
            $table->string('skype')->nullable()->after('wechat');
            $table->string('facebook')->nullable()->after('skype');
            $table->string('instagram')->nullable()->after('facebook');
            $table->string('twitter')->nullable()->after('instagram');
            $table->string('weibo')->nullable()->after('twitter');
            
            // Settings
            $table->integer('is_published')->default(0)->after('weibo');
            $table->integer('e_name_card')->default(0)->after('is_published');
            $table->integer('is_meet')->default(0)->after('e_name_card');
            
            // Ad
            $table->longText('ad_content')->nullable()->after('is_meet');
            $table->string('ad_url')->nullable()->after('ad_content');
            
            // Other
            $table->text('remark')->nullable()->after('ad_url');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'nickname',
                'phone1',
                'phone2',
                'email2',
                'address',
                'website',
                'working_hours',
                'slogan',
                'brief',
                'description',
                'company_name',
                'vat_number',
                'fax',
                'position',
                'bank_account',
                'line_id',
                'line_url',
                'line_message_status',
                'line_channel_id',
                'line_access_token',
                'line_secret',
                'line_user_id',
                'wechat',
                'skype',
                'facebook',
                'instagram',
                'twitter',
                'weibo',
                'is_published',
                'e_name_card',
                'is_meet',
                'ad_content',
                'ad_url',
                'remark',
            ]);
        });
    }
};