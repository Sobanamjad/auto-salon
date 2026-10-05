<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSetting extends Model
{
    protected $fillable = [
        'phone',
        'email',
        'facebook_url',
        'address',
        'map_embed_url',
    ];

    public static function getSettings()
    {
        return self::firstOrCreate([], [
            'phone' => '0920-776-819',
            'email' => 'bear50197@gmail.com',
            'facebook_url' => 'https://www.facebook.com/profile.php?id=61558088173434',
            'address' => '708 臺南市安平區中華西路二段315號5樓',
            'map_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.865656820449!2d120.18385617484994!3d22.991967117470566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e7672361574f7%3A0x2f6a8a6f784ac0db!2zNzA46Ie65Y2X5biC5a6J5bmz5Y2A5Y2U6YCy6YeM5Lit6I-v6KW_6Lev5LqM5q61MzE16Jmf!5e0!3m2!1szh-TW!2stw!4v1784613868430!5m2!1szh-TW!2stw',
        ]);
    }
}
