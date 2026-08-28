<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Journal extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'journals';

    protected $fillable = [
        'account_subject',
        'serial_no',
        'invoice_no',
        'invoice_date',
        'transaction_date',
        'customer_name',
        'customer_vat',
        'amount',
        'type',
        'summary',
        'is_invoice_encrypted',
        'invoice_password',
        'remark',
        'right_sn',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'transaction_date' => 'date',
        'invoice_date' => 'date',
        'is_invoice_encrypted' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    // Scopes
    public function scopeOrdered($query)
    {
        return $query->orderBy('transaction_date', 'desc')->orderBy('created_at', 'desc');
    }

    public function scopeByDateRange($query, $start, $end)
    {
        if ($start && $end) {
            return $query->whereBetween('transaction_date', [$start, $end]);
        }
        return $query;
    }

    public function scopeByCustomer($query, $name)
    {
        if ($name) {
            return $query->where('customer_name', 'LIKE', "%{$name}%");
        }
        return $query;
    }

    public function scopeBySerialNo($query, $serial)
    {
        if ($serial) {
            return $query->where('serial_no', 'LIKE', "%{$serial}%");
        }
        return $query;
    }

    public function scopeByInvoiceNo($query, $invoice)
    {
        if ($invoice) {
            return $query->where('invoice_no', 'LIKE', "%{$invoice}%");
        }
        return $query;
    }

    public static function getTotalBalance()
    {
        $totalIncome = self::where('type', 'income')->sum('amount');
        $totalExpense = self::where('type', 'expense')->sum('amount');
        return $totalIncome - $totalExpense;
    }

    public static function generateSerialNo()
    {
        return date('YmdHis') . rand(10, 99);
    }
}