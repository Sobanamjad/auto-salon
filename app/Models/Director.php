<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Director extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'sn',
        'language',
        'status',
        'show_on_home',
        'sort_order',
        'published_date',
        'end_date',
        'category',
        'title',
        'name',
        'brief',
        'content',
        'video',
        'note',
        'has_photo',
        'img',
        'img_w',
        'img_h',
        'views',
    ];

    protected $casts = [
        'status' => 'boolean',
        'show_on_home' => 'boolean',
        'has_photo' => 'boolean',
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

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}