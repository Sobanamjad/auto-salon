<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nickname')->nullable();
            $table->string('email')->unique();
            $table->string('email2')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->text('two_factor_secret')->nullable();
            $table->text('two_factor_recovery_codes')->nullable();
            $table->timestamp('two_factor_confirmed_at')->nullable();
            $table->string('role')->default('user')->index();
            $table->string('phone1')->nullable();
            $table->string('phone2')->nullable();
            $table->text('address')->nullable();
            $table->string('website')->nullable();
            $table->string('working_hours')->nullable();
            $table->string('slogan')->nullable();
            $table->text('brief')->nullable();
            $table->longText('description')->nullable();
            $table->string('company_name')->nullable();
            $table->string('vat_number')->nullable();
            $table->string('fax')->nullable();
            $table->string('position')->nullable();
            $table->longText('bank_account')->nullable();
            $table->string('line_id')->nullable();
            $table->string('line_url')->nullable();
            $table->integer('line_message_status')->default(0);
            $table->string('line_channel_id')->nullable();
            $table->string('line_access_token')->nullable();
            $table->string('line_secret')->nullable();
            $table->string('line_user_id')->nullable();
            $table->string('wechat')->nullable();
            $table->string('skype')->nullable();
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('twitter')->nullable();
            $table->string('weibo')->nullable();
            $table->integer('is_published')->default(0);
            $table->integer('e_name_card')->default(0);
            $table->integer('is_meet')->default(0);
            $table->longText('ad_content')->nullable();
            $table->string('ad_url')->nullable();
            $table->text('remark')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
