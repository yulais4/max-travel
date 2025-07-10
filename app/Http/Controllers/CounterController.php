<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Counter;

class CounterController extends Controller
{
    public static function writeAction($action){

        $nowDate = Carbon::now()->format('Y-m-d');

       if (Counter::where('action', $action)->where('date', $nowDate)->exists())
       {
        Counter::where('action', $action)->where('date', $nowDate)->increment('counter');
       } else {
        Counter::create([
            'date' => $nowDate,
            'action' => $action,
            'counter' => 1
            ]);
        }
    }
    public static function getStatistic(){
        return Counter::limit(50)->get();
    }
}
