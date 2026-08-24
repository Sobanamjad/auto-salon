<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $title
 * @property string $category
 * @property string $status
 * @property string $date_start
 * @property string $date_end
 * @property string $signup_start
 * @property string $signup_end
 * @property bool $is_open
 * @property string $content
 * @property int $max_attendees
 * @property string $location
 * @property bool $is_featured
 * @property int $sort_order
 * @property int $signup_count
 * @property int $views
 * @property int $checkin
 * @property int $absent
 * @property int $income
 * @property int $expense
 * @property string $qa_status
 * @property int $qa_count
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 */
#[Fillable([
    'title',
    'category', 
    'status',
    'date_start',
    'date_end',
    'signup_start',
    'signup_end',
    'is_open',
    'content',
    'max_attendees',
    'location',
    'is_featured',
    'sort_order',
    'signup_count',
    'views',
    'checkin',
    'absent',
    'income',
    'expense',
    'qa_status',
    'qa_count'
])]
class Event extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'date_start' => 'date',
            'date_end' => 'date',
            'signup_start' => 'date',
            'signup_end' => 'date',
            'is_open' => 'boolean',
            'is_featured' => 'boolean',
            'max_attendees' => 'integer',
            'sort_order' => 'integer',
            'signup_count' => 'integer',
            'views' => 'integer',
            'checkin' => 'integer',
            'absent' => 'integer',
            'income' => 'integer',
            'expense' => 'integer',
            'qa_count' => 'integer',
        ];
    }

    // Calculate attendance rate
    public function getAttendanceRateAttribute(): string
    {
        $total = $this->checkin + $this->absent;
        if ($total === 0) {
            return '0%';
        }
        return round(($this->checkin / $total) * 100) . '%';
    }

    // Calculate total (income - expense)
    public function getTotalAttribute(): int
    {
        return $this->income - $this->expense;
    }

    // Get status color for frontend
    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            '開放報名' => 'green',
            '停止報名' => 'red',
            '已截止' => 'gray',
            default => 'gray'
        };
    }
}