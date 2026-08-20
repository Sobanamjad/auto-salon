<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Admin Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('/', [AuthController::class, 'showLogin'])->name('login');
        Route::get('/login', [AuthController::class, 'showLogin'])->name('login.show');
        Route::post('/login', [AuthController::class, 'login'])->name('login.post');
    });
    
    Route::middleware(['auth', 'admin'])->group(function () {
        // Dashboard
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
        
        // ✅ Event Management Route - CORRECTED
        Route::get('/events', function () {
            return Inertia::render('Admin/EventManagement');
        })->name('events');
        
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        
        // 管理者
        Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
        
        // 網頁模組
        Route::get('/profile', [AdminController::class, 'profile'])->name('profile');
        Route::get('/organization', [AdminController::class, 'organization'])->name('organization');
        Route::get('/about', [AdminController::class, 'about'])->name('about');
        Route::get('/slider', [AdminController::class, 'slider'])->name('slider');
        Route::get('/albums', [AdminController::class, 'albums'])->name('albums');
        Route::get('/album-comments', [AdminController::class, 'albumComments'])->name('album-comments');
        Route::get('/news', [AdminController::class, 'news'])->name('news');
        Route::get('/member-announcements', [AdminController::class, 'memberAnnouncements'])->name('member-announcements');
        Route::get('/club-news', [AdminController::class, 'clubNews'])->name('club-news');
        Route::get('/articles', [AdminController::class, 'articles'])->name('articles');
        Route::get('/topics', [AdminController::class, 'topics'])->name('topics');
        Route::get('/downloads', [AdminController::class, 'downloads'])->name('downloads');
        Route::get('/faq', [AdminController::class, 'faq'])->name('faq');
        Route::get('/directors', [AdminController::class, 'directors'])->name('directors');
        Route::get('/links', [AdminController::class, 'links'])->name('links');
        Route::get('/guestbook', [AdminController::class, 'guestbook'])->name('guestbook');
        Route::get('/member-categories', [AdminController::class, 'memberCategories'])->name('member-categories');
        Route::get('/members', [AdminController::class, 'members'])->name('members');
        Route::get('/partners', [AdminController::class, 'partners'])->name('partners');
        Route::get('/products', [AdminController::class, 'products'])->name('products');
        Route::get('/friend-events', [AdminController::class, 'friendEvents'])->name('friend-events');
        Route::get('/jobs', [AdminController::class, 'jobs'])->name('jobs');
        Route::get('/timeline', [AdminController::class, 'timeline'])->name('timeline');
        
        // 會員收費
        Route::get('/payment-settings', [AdminController::class, 'paymentSettings'])->name('payment-settings');
        Route::get('/payments', [AdminController::class, 'payments'])->name('payments');
        Route::get('/payment-reports', [AdminController::class, 'paymentReports'])->name('payment-reports');
        
        // 記帳系統
        Route::get('/journal', [AdminController::class, 'journal'])->name('journal');
        Route::get('/accounts', [AdminController::class, 'accounts'])->name('accounts');
        
        // 客服系統
        Route::get('/red-white-categories', [AdminController::class, 'redWhiteCategories'])->name('red-white-categories');
        Route::get('/red-white', [AdminController::class, 'redWhite'])->name('red-white');
    });
});

// Public Routes
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

Route::get('/download', function () {
    $csn = request()->query('new_csn');
    return inertia('download', [
        'csn' => $csn !== null && $csn !== '' ? (string) $csn : null,
        'thisPage' => max(1, (int) request()->query('this_page', 1)),
    ]);
})->name('download');

Route::get('/about', function () {
    $newSn = request()->query('new_sn');
    $tab   = request()->query('tab', 'founding');

    if ($newSn === '7887') {
        $tab = 'founding';
    } elseif ($newSn === '7886') {
        $tab = 'charter';
    }

    return inertia('about', ['tab' => $tab]);
})->name('about');

Route::get('/works', function () {
    $csn = request()->query('new_csn');
    return inertia('works', [
        'csn' => $csn !== null && $csn !== '' ? (string) $csn : null,
        'searchTitle' => request()->query('sel_title'),
    ]);
})->name('works');

Route::get('/member', function () {
    $csn = request()->query('new_csn');
    return inertia('member', [
        'csn' => $csn !== null && $csn !== '' ? (string) $csn : null,
        'searchTitle' => request()->query('sel_title'),
    ]);
})->name('member');

Route::get('/news', function () {
    $csn = request()->query('new_csn');
    return inertia('news', [
        'csn' => $csn !== null && $csn !== '' ? (string) $csn : null,
        'searchTitle' => request()->query('sel_title'),
    ]);
})->name('news');

Route::get('/announcement', function () {
    $newCsn = request()->query('new_csn');
    $selNncsn = request()->query('sel_nncsn');
    return inertia('announcement', [
        'new_csn' => $newCsn !== null && $newCsn !== '' ? (string) $newCsn : null,
        'sel_nncsn' => $selNncsn !== null && $selNncsn !== '' ? (string) $selNncsn : null,
        'searchTitle' => request()->query('sel_title'),
    ]);
})->name('announcement');

Route::get('/albums', function () {
    $newMcsn = request()->query('new_mcsn');
    $year = request()->query('year');
    return inertia('albums', [
        'new_mcsn' => $newMcsn !== null && $newMcsn !== '' ? (string) $newMcsn : null,
        'initialYear' => $year !== null && $year !== '' ? (string) $year : null,
    ]);
})->name('albums');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';