<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MemberRequest;
use App\Models\Member;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::ordered()->get();

        return Inertia::render('Admin/members/Members', [
            'title' => '會員資訊',
            'members' => $members
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/members/MemberCreate', [
            'title' => '新增會員'
        ]);
    }

    public function store(MemberRequest $request)
    {
        $validated = $request->validated();

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        }

        Member::create($validated);

        return redirect()->route('admin.members.index')
                         ->with('success', '會員新增成功');
    }

    public function edit($id)
    {
        $member = Member::findOrFail($id);

        return Inertia::render('Admin/members/MemberEdit', [
            'title' => '編輯會員',
            'member' => $member
        ]);
    }

    public function update(MemberRequest $request, $id)
    {
        $member = Member::findOrFail($id);
        $validated = $request->validated();

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        } else {
            unset($validated['password']);
        }

        $member->update($validated);

        return redirect()->route('admin.members.index')
                         ->with('success', '會員更新成功');
    }

    public function destroy($id)
    {
        $member = Member::findOrFail($id);
        $member->delete();

        return redirect()->route('admin.members.index')
                         ->with('success', '會員刪除成功');
    }

    public function updateSort($id)
    {
        $member = Member::findOrFail($id);
        $member->update(['sort_order' => request('sort_order')]);

        return redirect()->back()->with('success', '排序已更新');
    }
}