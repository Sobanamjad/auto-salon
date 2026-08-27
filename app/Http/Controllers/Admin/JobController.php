<?php

namespace App\Http\Controllers\Admin;

    use App\Http\Controllers\Controller;
    use App\Http\Requests\JobRequest;
    use App\Models\Job;
    use Inertia\Inertia;

class JobController extends Controller
{
    public function index()
    {
        $jobs = Job::ordered()->get();

        return Inertia::render('Admin/jobs/Jobs', [
            'title' => '人才招募',
            'jobs' => $jobs
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/jobs/JobCreate', [
            'title' => '新增職缺'
        ]);
    }

    public function store(JobRequest $request)
    {
        $validated = $request->validated();

        Job::create([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order' => $validated['sort_order'],
            'published_start' => $validated['published_start'] ?? now(),
            'published_end' => $validated['published_end'] ?? '2200-12-31',
            'job_no' => $validated['job_no'] ?? null,
            'company' => $validated['company'],
            'contact_person' => $validated['contact_person'] ?? null,
            'contact_gender' => $validated['contact_gender'] ?? null,
            'contact_phone' => $validated['contact_phone'] ?? null,
            'contact_mobile' => $validated['contact_mobile'] ?? null,
            'contact_email' => $validated['contact_email'] ?? null,
            'contact_web' => $validated['contact_web'] ?? null,
            'work_location' => $validated['work_location'] ?? null,
            'work_area' => $validated['work_area'] ?? null,
            'nearby_school_1' => $validated['nearby_school_1'] ?? null,
            'nearby_school_2' => $validated['nearby_school_2'] ?? null,
            'job_title' => $validated['job_title'],
            'salary' => $validated['salary'] ?? null,
            'work_hours' => $validated['work_hours'] ?? null,
            'vacancies' => $validated['vacancies'] ?? null,
            'job_category' => $validated['job_category'] ?? null,
            'job_content' => $validated['job_content'] ?? null,
            'job_requirements' => $validated['job_requirements'] ?? null,
            'note' => $validated['note'] ?? null,
            'views' => 0,
        ]);

        return redirect()->route('admin.jobs.index')
                         ->with('success', '職缺新增成功');
    }

    public function edit($id)
    {
        $job = Job::findOrFail($id);

        return Inertia::render('Admin/jobs/JobEdit', [
            'title' => '編輯職缺',
            'job' => $job
        ]);
    }

    public function update(JobRequest $request, $id)
    {
        $job = Job::findOrFail($id);
        $validated = $request->validated();

        $job->update([
            'language' => $validated['language'],
            'status' => $validated['status'],
            'show_on_home' => $validated['show_on_home'],
            'sort_order' => $validated['sort_order'],
            'published_start' => $validated['published_start'] ?? now(),
            'published_end' => $validated['published_end'] ?? '2200-12-31',
            'job_no' => $validated['job_no'] ?? null,
            'company' => $validated['company'],
            'contact_person' => $validated['contact_person'] ?? null,
            'contact_gender' => $validated['contact_gender'] ?? null,
            'contact_phone' => $validated['contact_phone'] ?? null,
            'contact_mobile' => $validated['contact_mobile'] ?? null,
            'contact_email' => $validated['contact_email'] ?? null,
            'contact_web' => $validated['contact_web'] ?? null,
            'work_location' => $validated['work_location'] ?? null,
            'work_area' => $validated['work_area'] ?? null,
            'nearby_school_1' => $validated['nearby_school_1'] ?? null,
            'nearby_school_2' => $validated['nearby_school_2'] ?? null,
            'job_title' => $validated['job_title'],
            'salary' => $validated['salary'] ?? null,
            'work_hours' => $validated['work_hours'] ?? null,
            'vacancies' => $validated['vacancies'] ?? null,
            'job_category' => $validated['job_category'] ?? null,
            'job_content' => $validated['job_content'] ?? null,
            'job_requirements' => $validated['job_requirements'] ?? null,
            'note' => $validated['note'] ?? null,
        ]);

        return redirect()->route('admin.jobs.index')
                         ->with('success', '職缺更新成功');
    }

    public function destroy($id)
    {
        $job = Job::findOrFail($id);
        $job->delete();

        return redirect()->route('admin.jobs.index')
                         ->with('success', '職缺刪除成功');
    }

    public function toggleHome($id)
    {
        $job = Job::findOrFail($id);
        $job->update(['show_on_home' => !$job->show_on_home]);

        return redirect()->back()->with('success', '首頁顯示狀態已更新');
    }

    public function resetViews($id)
    {
        $job = Job::findOrFail($id);
        $job->update(['views' => 0]);

        return redirect()->back()->with('success', '點閱數已清除');
    }

    public function updateSort($id)
    {
        $job = Job::findOrFail($id);
        $job->update(['sort_order' => request('sort_order')]);

        return redirect()->back()->with('success', '排序已更新');
    }
}