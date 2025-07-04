<?php

use App\Http\Controllers\ChirpController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('test', function () {
        return Inertia::render('testing');
    })->name('test');

    Route::resource('chirps', ChirpController::class)->only(['index', 'store', 'destroy']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
