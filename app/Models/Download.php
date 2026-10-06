<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Download extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'downloads';

    protected $fillable = [
        'language', 'status', 'show_on_home', 'sort_order',
        'published_date', 'end_date', 'category', 'title',
        'brief', 'file_path', 'file_name', 'file_type', 'file_size',
        'ext_url', 'has_photo', 'img', 'img_w', 'img_h',
        'views', 'note',
    ];

    protected $casts = [
        'status'         => 'boolean',
        'show_on_home'   => 'boolean',
        'has_photo'      => 'boolean',
        'published_date' => 'date',
        'end_date'       => 'date',
        'created_at'     => 'datetime',
        'updated_at'     => 'datetime',
        'deleted_at'     => 'datetime',
    ];

    public function scopeActive($query)
    {
        return $query->where('status', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc')->orderBy('created_at', 'desc');
    }

    public function getFileSizeFormattedAttribute(): string
    {
        $bytes = $this->file_size;
        if ($bytes >= 1048576) return round($bytes / 1048576, 1) . ' MB';
        if ($bytes >= 1024)    return round($bytes / 1024, 1) . ' KB';
        return $bytes . ' B';
    }
}
