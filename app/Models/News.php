<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $published_date
 * @property string $end_date
 * @property bool $status
 * @property bool $show_on_home
 * @property bool $show_marquee
 * @property int $sort_order
 * @property string $category
 * @property string $subject
 * @property string $brief
 * @property string $content
 * @property string $keyword
 * @property string|null $video
 * @property string|null $map
 * @property string|null $note
 * @property int $views
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 */
#[Fillable([
    'published_date',
    'end_date',
    'status',
    'show_on_home',
    'show_marquee',
    'sort_order',
    'category',
    'photo',
    'subject',
    'brief',
    'content',
    'keyword',
    'video',
    'map',
    'note',
    'views'
])]
class News extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'published_date' => 'datetime',
            'end_date' => 'date',
            'status' => 'boolean',
            'show_on_home' => 'boolean',
            'show_marquee' => 'boolean',
            'sort_order' => 'integer',
            'views' => 'integer',
        ];
    }
}
