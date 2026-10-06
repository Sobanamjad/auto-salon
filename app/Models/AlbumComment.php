<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AlbumComment extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'album_comments';

    protected $fillable = [
        'album_id', 'commenter_name', 'commenter_email',
        'content', 'status', 'is_pinned', 'ip_address', 'sort_order',
    ];

    protected $casts = [
        'is_pinned'  => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function album()
    {
        return $this->belongsTo(Album::class);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('is_pinned', 'desc')->orderBy('created_at', 'desc');
    }

    public function scopeByStatus($query, $status)
    {
        if ($status) return $query->where('status', $status);
        return $query;
    }

    public static function getStatuses(): array
    {
        return [
            'pending'  => ['label' => '待審核', 'color' => 'bg-yellow-100 text-yellow-700'],
            'approved' => ['label' => '已通過', 'color' => 'bg-green-100 text-green-700'],
            'rejected' => ['label' => '已拒絕', 'color' => 'bg-red-100 text-red-700'],
        ];
    }
}
