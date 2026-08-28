<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RedWhite extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'red_white';

    protected $fillable = [
        'category',
        'person_name',
        'event_date_start',
        'event_date_end',
        'attend_status',
        'attendees',
        'amount',
        'remark',
        'is_closed',
        'sort_order',
        'right_sn',
    ];

    protected $casts = [
        'is_closed' => 'boolean',
        'event_date_start' => 'date',
        'event_date_end' => 'date',
        'amount' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_closed', false);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc')->orderBy('created_at', 'desc');
    }

    public function scopeByCategory($query, $category)
    {
        if ($category) {
            return $query->where('category', $category);
        }
        return $query;
    }

    public function scopeSearchByName($query, $name)
    {
        if ($name) {
            return $query->where('person_name', 'LIKE', "%{$name}%");
        }
        return $query;
    }

    public function scopeByDate($query, $date)
    {
        if ($date) {
            return $query->where('event_date_start', '<=', $date)
                         ->where('event_date_end', '>=', $date);
        }
        return $query;
    }
}