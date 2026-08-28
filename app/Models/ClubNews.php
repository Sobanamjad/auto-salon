<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClubNews extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'language',
        'title',
        'city',
        'district',
        'village',
        'source',
        'category',
        'content',
        'views',
        'is_excluded',
    ];

    protected $casts = [
        'is_excluded' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_excluded', false);
    }

    public function scopeExcluded($query)
    {
        return $query->where('is_excluded', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
}