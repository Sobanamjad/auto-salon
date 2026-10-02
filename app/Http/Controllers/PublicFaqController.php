<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use Inertia\Inertia;

class PublicFaqController extends Controller
{
    public function index()
    {
        $csn = request()->query('new_csn');
        $thisPage = (int) request()->query('this_page', 1);

        $query = Faq::active()->ordered();

        if ($csn) {
            $query->byCategory($csn);
        }

        $totalItems = $query->count();
        $totalPages = max(1, (int) ceil($totalItems / 10));
        $currentPage = min(max(1, $thisPage), $totalPages);

        $items = $query
            ->skip(($currentPage - 1) * 10)
            ->take(10)
            ->get();

        return Inertia::render('qa', [
            'csn' => $csn,
            'thisPage' => $currentPage,
            'totalPages' => $totalPages,
            'totalItems' => $totalItems,
            'items' => $items,
        ]);
    }
}
