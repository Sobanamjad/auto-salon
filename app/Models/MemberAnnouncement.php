<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MemberAnnouncement extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'language',
        'status',
        'sort_order',
        'published_date',
        'end_date',
        'subject',
        'content',
        'target_audience',
        'has_attachment',
        'has_photo',
        'views',
        'note',
    ];

    protected $casts = [
        'status' => 'boolean',
        'has_attachment' => 'boolean',
        'has_photo' => 'boolean',
        'published_date' => 'date',
        'end_date' => 'date',
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