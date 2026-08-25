<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ColumnArticle extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'language',
        'status',
        'show_on_home',
        'sort_order',
        'published_date',
        'end_date',
        'category',
        'subject',
        'brief',
        'content',
        'keyword',
        'video',
        'map',
        'note',
        'has_photo',
        'views',
        'platform_category',
        'join_platform',
    ];

    protected $casts = [
        'status' => 'boolean',
        'show_on_home' => 'boolean',
        'has_photo' => 'boolean',
        'join_platform' => 'boolean',
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

    public function scopeShowOnHome($query)
    {
        return $query->where('show_on_home', true);
    }
}