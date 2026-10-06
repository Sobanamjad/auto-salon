<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $period    = request('sel_period');
        $status    = request('sel_status');
        $search    = request('sel_title');

        $query = Payment::with('member')->ordered();

        if ($period)  $query->byPeriod($period);
        if ($status)  $query->byStatus($status);
        if ($search)  $query->byMember($search);

        $payments = $query->paginate(20)->withQueryString();

        // Stats for current period
        $currentPeriod = $period ?? date('Y');
        $stats = [
            'total'    => Payment::byPeriod($currentPeriod)->count(),
            'paid'     => Payment::byPeriod($currentPeriod)->byStatus('paid')->count(),
            'unpaid'   => Payment::byPeriod($currentPeriod)->byStatus('unpaid')->count(),
            'overdue'  => Payment::byPeriod($currentPeriod)->byStatus('overdue')->count(),
            'total_amount' => Payment::byPeriod($currentPeriod)->sum('amount'),
            'paid_amount'  => Payment::byPeriod($currentPeriod)->byStatus('paid')->sum('paid_amount'),
        ];

        // Available periods
        $periods = Payment::select('period')
            ->distinct()
            ->orderBy('period', 'desc')
            ->pluck('period')
            ->toArray();

        if (empty($periods)) {
            $periods = [date('Y'), date('Y') - 1];
        }

        return Inertia::render('Admin/payments/Payments', [
            'title'    => '繳費作業',
            'data'     => $payments,
            'stats'    => $stats,
            'periods'  => $periods,
            'statuses' => Payment::getStatuses(),
            'methods'  => Payment::getMethods(),
            'filters'  => compact('period', 'status', 'search'),
        ]);
    }

    public function create()
    {
        $members = Member::active()->ordered()->get(['id', 'member_no', 'name']);

        return Inertia::render('Admin/payments/PaymentForm', [
            'title'    => '新增繳費記錄',
            'item'     => null,
            'members'  => $members,
            'statuses' => Payment::getStatuses(),
            'methods'  => Payment::getMethods(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'member_id'      => 'required|exists:members,id',
            'period'         => 'required|string|max:20',
            'amount'         => 'required|numeric|min:0',
            'paid_amount'    => 'nullable|numeric|min:0',
            'due_date'       => 'nullable|date',
            'paid_date'      => 'nullable|date',
            'payment_method' => 'nullable|string|max:50',
            'receipt_no'     => 'nullable|string|max:50',
            'status'         => 'required|in:unpaid,paid,overdue,exempted',
            'remark'         => 'nullable|string',
        ]);

        // Auto-fill member snapshot
        $member = Member::find($validated['member_id']);
        $validated['member_no']   = $member->member_no;
        $validated['member_name'] = $member->name;

        Payment::create($validated);

        return redirect()->route('admin.payments.index')
                         ->with('success', '繳費記錄新增成功！');
    }

    public function edit($id)
    {
        $item    = Payment::findOrFail($id);
        $members = Member::active()->ordered()->get(['id', 'member_no', 'name']);

        return Inertia::render('Admin/payments/PaymentForm', [
            'title'    => '編輯繳費記錄',
            'item'     => $item,
            'members'  => $members,
            'statuses' => Payment::getStatuses(),
            'methods'  => Payment::getMethods(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $item = Payment::findOrFail($id);

        $validated = $request->validate([
            'member_id'      => 'required|exists:members,id',
            'period'         => 'required|string|max:20',
            'amount'         => 'required|numeric|min:0',
            'paid_amount'    => 'nullable|numeric|min:0',
            'due_date'       => 'nullable|date',
            'paid_date'      => 'nullable|date',
            'payment_method' => 'nullable|string|max:50',
            'receipt_no'     => 'nullable|string|max:50',
            'status'         => 'required|in:unpaid,paid,overdue,exempted',
            'remark'         => 'nullable|string',
        ]);

        $member = Member::find($validated['member_id']);
        $validated['member_no']   = $member->member_no;
        $validated['member_name'] = $member->name;

        $item->update($validated);

        return redirect()->route('admin.payments.index')
                         ->with('success', '繳費記錄更新成功！');
    }

    public function destroy($id)
    {
        $item = Payment::findOrFail($id);
        $item->delete();

        return redirect()->route('admin.payments.index')
                         ->with('success', '繳費記錄刪除成功！');
    }

    public function markPaid($id)
    {
        $item = Payment::findOrFail($id);
        $item->update([
            'status'      => 'paid',
            'paid_date'   => now()->toDateString(),
            'paid_amount' => $item->amount,
        ]);

        return redirect()->back()->with('success', '已標記為已繳費！');
    }

    public function report()
    {
        $period = request('sel_period', date('Y'));

        $allPeriods = Payment::select('period')
            ->distinct()
            ->orderBy('period', 'desc')
            ->pluck('period')
            ->toArray();

        if (empty($allPeriods)) {
            $allPeriods = [date('Y'), date('Y') - 1];
        }

        $payments = Payment::with('member')
            ->byPeriod($period)
            ->ordered()
            ->get();

        $statuses = Payment::getStatuses();

        // Summary by status
        $summary = [];
        foreach ($statuses as $key => $info) {
            $filtered = $payments->where('status', $key);
            $summary[$key] = [
                'label'       => $info['label'],
                'color'       => $info['color'],
                'count'       => $filtered->count(),
                'amount'      => $filtered->sum('amount'),
                'paid_amount' => $filtered->sum('paid_amount'),
            ];
        }

        // Monthly breakdown
        $monthly = $payments->where('status', 'paid')
            ->groupBy(fn($p) => $p->paid_date?->format('Y-m') ?? '未知')
            ->map(fn($group) => [
                'count'  => $group->count(),
                'amount' => $group->sum('paid_amount'),
            ])
            ->sortKeys();

        return Inertia::render('Admin/payments/PaymentReports', [
            'title'      => '報表統計',
            'period'     => $period,
            'allPeriods' => $allPeriods,
            'payments'   => $payments,
            'summary'    => $summary,
            'monthly'    => $monthly,
            'statuses'   => $statuses,
        ]);
    }

    // Batch create payments for all active members
    public function batchCreate(Request $request)
    {
        $validated = $request->validate([
            'period'   => 'required|string|max:20',
            'amount'   => 'required|numeric|min:0',
            'due_date' => 'nullable|date',
        ]);

        $members = Member::active()->get();
        $created = 0;

        foreach ($members as $member) {
            $exists = Payment::where('member_id', $member->id)
                             ->where('period', $validated['period'])
                             ->exists();
            if (!$exists) {
                Payment::create([
                    'member_id'   => $member->id,
                    'member_no'   => $member->member_no,
                    'member_name' => $member->name,
                    'period'      => $validated['period'],
                    'amount'      => $validated['amount'],
                    'paid_amount' => 0,
                    'due_date'    => $validated['due_date'] ?? null,
                    'status'      => 'unpaid',
                ]);
                $created++;
            }
        }

        return redirect()->route('admin.payments.index')
                         ->with('success', "已為 {$created} 位會員建立繳費記錄！");
    }
}
