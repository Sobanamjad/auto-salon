<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/timeline', function () {
    $csn = request()->query('new_csn');
    return inertia('timeline', ['csn' => $csn]);
})->name('timeline');

Route::inertia('/people', 'people')->name('people');

Route::get('/about', function () {
    // Support both ?tab= (internal links) and ?new_sn= (original site URLs)
    $newSn = request()->query('new_sn');
    $tab   = request()->query('tab', 'founding');

    if ($newSn === '7887') {
        $tab = 'founding';
    } elseif ($newSn === '7886') {
        $tab = 'charter';
    }

    return inertia('about', ['tab' => $tab]);
})->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
