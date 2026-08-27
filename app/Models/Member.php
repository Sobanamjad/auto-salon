<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'member_no',
        'name',
        'gender',
        'phone',
        'mobile',
        'email',
        'username',
        'password',
        'company',
        'position',
        'school',
        'department',
        'category',
        'category2',
        'member_type',
        'position_in_association',
        'affiliated_unit',
        'period_start',
        'period_end',
        'fee',
        'note',
        'sort_order',
        'status',
        'views',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'status' => 'boolean',
        'period_start' => 'date',
        'period_end' => 'date',
        'fee' => 'decimal:2',
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

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function getFullNameAttribute()
    {
        return $this->name . ($this->gender ? ' ' . $this->gender : '');
    }
}