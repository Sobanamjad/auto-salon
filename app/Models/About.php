<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $language
 * @property bool $status
 * @property bool $show_on_home
 * @property int $sort_order
 * @property string $category
 * @property string $subject
 * @property string $brief
 * @property string $content
 * @property string|null $image
 * @property string|null $video
 * @property string|null $note
 * @property string|null $issuedate
 * @property string|null $enddate
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 */
#[Fillable([
    'language',
    'status',
    'show_on_home',
    'sort_order',
    'category',
    'subject',
    'brief',
    'content',
    'image',
    'video',
    'note',
    'issuedate',
    'enddate'
])]
class About extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'status' => 'boolean',
            'show_on_home' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
