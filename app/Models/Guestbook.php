<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Guestbook extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'language',
        'status',
        'sort_order',
        'published_date',
        'end_date',
        'category',
        'question',
        'brief',
        'answer',
        'question_date',
        'answer_date',
        'asker_name',
        'asker_company',
        'asker_mobile',
        'asker_phone',
        'asker_fax',
        'asker_email',
        'asker_line',
        'asker_wechat',
        'asker_whatsapp',
        'asker_country',
        'asker_note',
        'note',
        'has_photo',
        'views',
    ];

    protected $casts = [
        'status' => 'boolean',
        'has_photo' => 'boolean',
        'published_date' => 'date',
        'end_date' => 'date',
        'question_date' => 'date',
        'answer_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function scopeActive($query)
    {
        return $query->where('status', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc')
                     ->orderBy('created_at', 'desc');
    }
}