<?php

use App\Events\NewMessage;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProfileController;
use Illuminate\Mail\Events\MessageSent;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/messages', function () {
    return view('messages');
});
Route::get('/send', function () {
    event(new NewMessage("Hello World!", auth()->user()));
    dd("message sent");
});


Route::get('/dashboard', ChatController::class. '@index')->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Message Route
Route::get('fetch-messages', [ChatController::class, 'fetchMessages'])->name('fetch.message');
Route::post('send-messages', [ChatController::class, 'sendMessages'])->name('send.message');
require __DIR__.'/auth.php';
