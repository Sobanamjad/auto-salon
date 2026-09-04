<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PublicSliderController;
use App\Http\Controllers\Admin\AlbumController;
use App\Http\Controllers\Admin\PartnerController;

// Public API routes
Route::get('/sliders', [PublicSliderController::class, 'getActiveSliders'])->name('api.sliders');
Route::get('/albums', [AlbumController::class, 'getPublicAlbums'])->name('api.albums');
Route::get('/partners', [PartnerController::class, 'getPublicPartners'])->name('api.partners');
