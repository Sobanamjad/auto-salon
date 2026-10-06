<?php

namespace App\Http\Controllers;

use App\Models\Guestbook;
use Inertia\Inertia;

class PublicGuestbookController extends Controller
{
    public function index()
    {
        $csn      = request()->query('new_csn');
        $csn      = ($csn !== null && $csn !== '') ? (string) $csn : null;
        $thisPage = max(1, (int) request()->query('this_page', 1));
        $perPage  = 10;

        $query = Guestbook::active()
            ->ordered()
            ->where('end_date', '>=', now()->toDateString());

        if ($csn) {
            $query->where('category', $csn);
        }

        $totalItems  = $query->count();
        $totalPages  = max(1, (int) ceil($totalItems / $perPage));
        $currentPage = min($thisPage, $totalPages);

        $items = $query
            ->skip(($currentPage - 1) * $perPage)
            ->take($perPage)
            ->get(['id', 'category', 'question', 'brief', 'answer', 'question_date', 'answer_date', 'asker_name', 'views'])
            ->map(fn($g) => [
                'id'            => $g->id,
                'category'      => $g->category,
                'question'      => $g->question,
                'brief'         => $g->brief,
                'answer'        => $g->answer,
                'question_date' => $g->question_date?->format('Y-m-d'),
                'answer_date'   => $g->answer_date?->format('Y-m-d'),
                'asker_name'    => $g->asker_name,
                'views'         => $g->views,
            ]);

        // Categories dynamically from DB
        $categories = Guestbook::active()
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->where('end_date', '>=', now()->toDateString())
            ->distinct()
            ->pluck('category')
            ->sort()
            ->values()
            ->toArray();

        return Inertia::render('guestbook', [
            'csn'        => $csn,
            'thisPage'   => $currentPage,
            'totalPages' => $totalPages,
            'totalItems' => $totalItems,
            'items'      => $items,
            'categories' => $categories,
        ]);
    }

    public function show($id)
    {
        $item = Guestbook::active()->findOrFail($id);

        $item->increment('views');

        return Inertia::render('guestbook-view', [
            'item' => [
                'id'            => $item->id,
                'category'      => $item->category,
                'question'      => $item->question,
                'brief'         => $item->brief,
                'answer'        => $item->answer,
                'question_date' => $item->question_date?->format('Y-m-d'),
                'answer_date'   => $item->answer_date?->format('Y-m-d'),
                'asker_name'    => $item->asker_name,
                'asker_company' => $item->asker_company,
                'asker_country' => $item->asker_country,
                'views'         => $item->views,
            ],
        ]);
    }
}
