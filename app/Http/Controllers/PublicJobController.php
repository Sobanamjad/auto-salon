<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Inertia\Inertia;

class PublicJobController extends Controller
{
    public function index()
    {
        $jobs = Job::active()
            ->ordered()
            ->get();

        return Inertia::render('job', [
            'jobs' => $jobs,
        ]);
    }

    public function show($id)
    {
        $job = Job::findOrFail($id);
        $job->increment('views');

        return Inertia::render('job', [
            'jobs' => [$job],
        ]);
    }
}
