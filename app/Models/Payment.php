<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'payments';

    protected $fillable = [
        'member_id',
        'member_no',
        'member_name',
        'period',
        'amount',
        'paid_amount',
        'due_date',
        'paid_date',
        'payment_method',
        'receipt_no',
        'status',
        'remark',
        'created_by',
    ];

    protected $casts = [
        'amount'      => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'due_date'    => 'date',
        'paid_date'   => 'date',
        'created_at'  => 'datetime',
        'updated_at'  => 'datetime',
        'deleted_at'  => 'datetime',
    ];

    // Relations
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    // Scopes
    public function scopeOrdered($query)
    {
        return $query->orderBy('period', 'desc')->orderBy('created_at', 'desc');
    }

    public function scopeByPeriod($query, $period)
    {
        if ($period) {
            return $query->where('period', $period);
        }
        return $query;
    }

    public function scopeByStatus($query, $status)
    {
        if ($status) {
            return $query->where('status', $status);
        }
        return $query;
    }

    public function scopeByMember($query, $search)
    {
        if ($search) {
            return $query->where(function ($q) use ($search) {
                $q->where('member_name', 'LIKE', "%{$search}%")
                  ->orWhere('member_no', 'LIKE', "%{$search}%");
            });
        }
        return $query;
    }

    // Status helpers
    public static function getStatuses(): array
    {
        return [
            'unpaid'   => ['label' => '未繳費', 'color' => 'bg-red-100 text-red-700'],
            'paid'     => ['label' => '已繳費', 'color' => 'bg-green-100 text-green-700'],
            'overdue'  => ['label' => '逾期',   'color' => 'bg-orange-100 text-orange-700'],
            'exempted' => ['label' => '免繳',   'color' => 'bg-gray-100 text-gray-600'],
        ];
    }

    public static function getMethods(): array
    {
        return ['現金', '匯款', '信用卡', '支票', '轉帳', '其他'];
    }
}
