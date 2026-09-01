<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Slider extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'sliders';

    protected $fillable = [
        'language',
        'title',
        'image',
        'image_alt',
        'link',
        'sort_order',
        'is_active',
        'width',
        'height',
        'video_url',
        'description',
    ];

    protected $appends = ['image_url', 'thumbnail', 'language_label'];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'width' => 'integer',
        'height' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc')->orderBy('created_at', 'desc');
    }

    public function scopeByLanguage($query, $language)
    {
        if ($language) {
            return $query->where('language', $language);
        }
        return $query;
    }

    public function scopeSearchByTitle($query, $title)
    {
        if ($title) {
            return $query->where('title', 'LIKE', "%{$title}%");
        }
        return $query;
    }

    // Accessor for full image URL
    public function getImageUrlAttribute(): ?string
    {
        if ($this->image) {
            // Check if it's an old system image (starts with b)
            if (preg_match('/^b\d+\.png$/', $this->image)) {
                return '/asd_files/' . $this->image;
            }
            return asset('storage/sliders/' . $this->image);
        }
        return null;
    }

    // Accessor for thumbnail
    public function getThumbnailAttribute(): ?string
    {
        if ($this->image) {
            // Check if it's an old system image (starts with b)
            if (preg_match('/^b\d+\.png$/', $this->image)) {
                return '/asd_files/' . $this->image;
            }
            return asset('storage/sliders/thumbnails/' . $this->image);
        }
        return null;
    }

    // Get language label
    public function getLanguageLabelAttribute(): string
    {
        $labels = [
            'TS' => '繁中',
            'EN' => '英文',
            'JP' => '日文',
        ];
        return $labels[$this->language] ?? $this->language ?? 'TS';
    }
}