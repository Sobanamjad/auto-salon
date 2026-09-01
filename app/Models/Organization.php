<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Organization extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'organizations';

    protected $fillable = [
        'name',
        'city',
        'district',
        'village',
        'address',
        'website',
        'total_views',
        'purchased_space',
        'used_space',
        'line_card_space',
        'language',
        'contact_person',
        'contact_phone',
        'contact_email',
        'description',
        'is_active',
        'password',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'total_views' => 'integer',
        'purchased_space' => 'integer',
        'used_space' => 'integer',
        'line_card_space' => 'integer',
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
        return $query->orderBy('name', 'asc');
    }

    // Accessors for formatted space
    public function getPurchasedSpaceFormattedAttribute(): string
    {
        return $this->formatBytes($this->purchased_space);
    }

    public function getUsedSpaceFormattedAttribute(): string
    {
        return $this->formatBytes($this->used_space);
    }

    public function getRemainingSpaceFormattedAttribute(): string
    {
        $remaining = $this->purchased_space - $this->used_space;
        return $this->formatBytes($remaining);
    }

    public function getLineCardSpaceFormattedAttribute(): string
    {
        return $this->formatBytes($this->line_card_space);
    }

    public function getLocationAttribute(): string
    {
        $parts = array_filter([$this->city, $this->district, $this->village]);
        return implode(' ', $parts);
    }

    private function formatBytes(int $bytes): string
    {
        if ($bytes >= 1073741824) {
            return number_format($bytes / 1073741824, 2) . ' GB';
        } elseif ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 2) . ' KB';
        } else {
            return $bytes . ' B';
        }
    }

    // Increment views
    public function incrementViews()
    {
        $this->increment('total_views');
    }
}