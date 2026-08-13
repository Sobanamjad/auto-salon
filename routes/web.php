<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/timeline', function () {
    $csn = request()->query('new_csn');
    return inertia('timeline', ['csn' => $csn]);
})->name('timeline');

Route::inertia('/people', 'people')->name('people');

Route::get('/contact', [ContactController::class, 'show'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/contact/captcha', [ContactController::class, 'captcha'])->name('contact.captcha');

Route::inertia('/life', 'life')->name('life');

Route::get('/uninews', function () {
    $page = (int) request()->query('this_page', 1);

    return inertia('uninews', ['thisPage' => max(1, $page)]);
})->name('uninews');

Route::get('/job', function () {
    return inertia('job', [
        'newSn' => (string) request()->query('new_sn', '1100'),
        'lang' => request()->query('lang'),
    ]);
})->name('job');

Route::get('/link', function () {
    return inertia('link', [
        'csn' => request()->query('new_csn'),
    ]);
})->name('link');

Route::get('/qa', function () {
    return inertia('qa', [
        'csn' => request()->query('new_csn'),
        'thisPage' => max(1, (int) request()->query('this_page', 1)),
    ]);
})->name('qa');

Route::get('/product', function () {
    return inertia('product', [
        'csn' => (string) request()->query('new_csn', '7519'),
        'upSn' => (string) request()->query('up_sn', '0'),
        'thisPage' => max(1, (int) request()->query('this_page', 1)),
        'searchTitle' => request()->query('sel_title'),
    ]);
})->name('product');

Route::get('/article', function () {
    $csn = request()->query('new_csn');

    return inertia('article', [
        'csn' => $csn !== null && $csn !== '' ? (string) $csn : null,
        'thisPage' => max(1, (int) request()->query('this_page', 1)),
    ]);
})->name('article');

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
