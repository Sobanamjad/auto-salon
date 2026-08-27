<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Job extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'job_postings';

    protected $fillable = [
        'language',
        'status',
        'show_on_home',
        'sort_order',
        'published_start',
        'published_end',
        'job_no',
        'company',
        'contact_person',
        'contact_gender',
        'contact_phone',
        'contact_mobile',
        'contact_email',
        'contact_web',
        'work_location',
        'work_area',
        'nearby_school_1',
        'nearby_school_2',
        'job_title',
        'salary',
        'work_hours',
        'vacancies',
        'job_category',
        'job_content',
        'job_requirements',
        'note',
        'views',
    ];

    protected $casts = [
        'status' => 'boolean',
        'show_on_home' => 'boolean',
        'published_start' => 'date',
        'published_end' => 'date',
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