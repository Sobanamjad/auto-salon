<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\JournalRequest;
use App\Models\Journal;
use Inertia\Inertia;

class JournalController extends Controller
{
    public function index()
    {
        $selStart   = request('sel_start');
        $selStop    = request('sel_stop');
        $selTitle   = request('sel_title');
        $selSerial  = request('sel_serial');
        $selInvoice = request('sel_invoice');

        $query = Journal::ordered();

        if ($selStart && $selStop) {
            $query->whereBetween('transaction_date', [$selStart, $selStop]);
        } elseif ($selStart) {
            $query->where('transaction_date', '>=', $selStart);
        } elseif ($selStop) {
            $query->where('transaction_date', '<=', $selStop);
        }

        if ($selTitle) {
            $query->where('customer_name', 'LIKE', "%{$selTitle}%");
        }

        if ($selSerial) {
            $query->where('serial_no', 'LIKE', "%{$selSerial}%");
        }

        if ($selInvoice) {
            $query->where('invoice_no', 'LIKE', "%{$selInvoice}%");
        }

        $journals = $query->paginate(20)->withQueryString();

        $totalBalance = Journal::getTotalBalance();

        return Inertia::render('Admin/journal/Journal', [
            'title'           => '會計日記簿',
            'data'            => $journals,
            'totalBalance'    => $totalBalance,
            'accountSubjects' => $this->getAccountSubjects(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/journal/JournalForm', [
            'title' => '新增會計日記簿',
            'journal' => null,
            'accountSubjects' => $this->getAccountSubjects(),
            'serialNo' => Journal::generateSerialNo(),
        ]);
    }

    public function store(JournalRequest $request)
    {
        $validated = $request->validated();
        $validated['right_sn'] = 260748;

        Journal::create($validated);

        return redirect()->route('admin.journal.index')
                         ->with('success', '日記簿新增成功！');
    }

    public function edit($id)
    {
        $journal = Journal::findOrFail($id);

        return Inertia::render('Admin/journal/JournalForm', [
            'title' => '編輯會計日記簿',
            'journal' => $journal,
            'accountSubjects' => $this->getAccountSubjects(),
            'serialNo' => $journal->serial_no,
        ]);
    }

    public function update(JournalRequest $request, $id)
    {
        $journal = Journal::findOrFail($id);
        $journal->update($request->validated());

        return redirect()->route('admin.journal.index')
                         ->with('success', '日記簿更新成功！');
    }

    public function destroy($id)
    {
        $journal = Journal::findOrFail($id);
        $journal->delete();

        return redirect()->route('admin.journal.index')
                         ->with('success', '日記簿刪除成功！');
    }

    public function report()
    {
        // Report logic
        return Inertia::render('Admin/journal/JournalReport', [
            'title' => '日記簿報表',
            'data' => Journal::ordered()->get(),
            'totalBalance' => Journal::getTotalBalance(),
        ]);
    }

    private function getAccountSubjects()
    {
        return [
            ['id' => '1108', 'name' => '應收收入'],
            ['id' => '1109', 'name' => '應付支出'],
            ['id' => '1110', 'name' => '現金'],
            ['id' => '1111', 'name' => '銀行存款'],
            ['id' => '1112', 'name' => '應收帳款'],
            ['id' => '1113', 'name' => '應付帳款'],
            ['id' => '1114', 'name' => '營業收入'],
            ['id' => '1115', 'name' => '營業成本'],
            ['id' => '1116', 'name' => '管理費用'],
            ['id' => '1117', 'name' => '其他收入'],
            ['id' => '1118', 'name' => '其他支出'],
        ];
    }
}