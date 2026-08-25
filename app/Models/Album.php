<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string|null $description
 * @property string|null $cover_image
 * @property string|null $album_date
 * @property string $category
 * @property string $status
 * @property bool $is_featured
 * @property int $sort_order
 * @property int $views
 * @property int $photo_count
 * @property int $comment_count
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 */
#[Fillable([
    'title',
    'slug',
    'description',
    'cover_image',
    'album_date',
    'category',
    'status',
    'is_featured',
    'sort_order',
    'views',
    'photo_count',
    'comment_count'
])]
class Album extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'album_date' => 'date',
            'is_featured' => 'boolean',
        ];
    }
}
