<?php

use App\Http\Controllers\CounterController;
use App\Http\Controllers\TagCommentController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;
use Jenssegers\Agent\Agent;

Route::get('/', function () {
   CounterController::writeAction('site_opened');

    $agent = new Agent();

    if($agent->isMobile())
        // Mobile
        return view('mobile-main');
    else
        //return view('main-desktop');
        return view('main');
});

Route::get('/tbot', function () {
    return view('mobile-main');
});

Route::get('/getTags', [TagController::class, 'getTags']);
Route::post('/sendTag', [TagController::class, 'sendTag'])->name('sendTag');

Route::post('/api/marker/sendLike', [TagController::class, 'markerLike'])->name('marker.like');
Route::post('/api/marker/sendDislike', [TagController::class, 'markerDislike'])->name('marker.dislike');

Route::get('/api/marker/getComments', [TagCommentController::class, 'getComments'])->name('marker.getComments');
Route::post('/api/marker/sendComment', [TagCommentController::class, 'addComment'])->name('marker.addComment');

Route::get('/statistic', function(){
    return view('statistic',
    ['db_response' => CounterController::getStatistic()]);
});

Route::get('/test', function() {
    return view('mobile-main');
});