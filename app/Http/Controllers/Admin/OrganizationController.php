<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrganizationRequest;
use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function index()
    {
        $organizations = Organization::ordered()->get();

        return Inertia::render('Admin/organization/Organization', [
            'title' => '組織資料',
            'organizations' => $organizations,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/organization/OrganizationForm', [
            'title' => '新增組織',
            'organization' => null,
        ]);
    }

    public function store(OrganizationRequest $request)
    {
        Organization::create($request->validated());

        return redirect()->route('admin.organization.index')
                         ->with('success', '組織新增成功！');
    }

    public function edit($id)
    {
        $organization = Organization::findOrFail($id);

        return Inertia::render('Admin/organization/OrganizationForm', [
            'title' => '編輯組織',
            'organization' => $organization,
        ]);
    }

    public function update(OrganizationRequest $request, $id)
    {
        $organization = Organization::findOrFail($id);
        $organization->update($request->validated());

        return redirect()->route('admin.organization.index')
                         ->with('success', '組織更新成功！');
    }

    public function destroy($id)
    {
        $organization = Organization::findOrFail($id);
        $organization->delete();

        return redirect()->route('admin.organization.index')
                         ->with('success', '組織刪除成功！');
    }

    public function toggleActive($id)
    {
        $organization = Organization::findOrFail($id);
        $organization->update(['is_active' => !$organization->is_active]);

        return redirect()->back()->with('success', '狀態已更新！');
    }

    public function changePassword($id)
    {
        // Redirect to password change page
        return Inertia::render('Admin/organization/OrganizationPassword', [
            'organization' => Organization::findOrFail($id),
        ]);
    }

    public function updatePassword(Request $request, $id)
    {
        $request->validate([
            'password' => 'required|string|min:6|confirmed',
        ]);

        $organization = Organization::findOrFail($id);
        $organization->update([
            'password' => bcrypt($request->password),
        ]);

        return redirect()->route('admin.organization.index')
                         ->with('success', '密碼更新成功！');
    }
}