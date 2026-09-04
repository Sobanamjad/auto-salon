<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Partner extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'language',
        'status',
        'show_on_home',
        'sort_order',
        'name',
        'city',
        'district',
        'village',
        'brief',
        'content',
        'note',
        'views',
        'image',
        'slogan',
        'tag',
        'external_link',
        'company_name',
        'booking_link',
        'take_number_link',
        'current_number_link',
    ];

    protected $casts = [
        'status' => 'boolean',
        'show_on_home' => 'boolean',
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

    public function getFullAddressAttribute()
    {
        $parts = array_filter([$this->city, $this->district, $this->village]);
        return implode(' ', $parts);
    }
}