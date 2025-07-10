<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;
use Carbon\Carbon;

class TagController extends Controller
{
    public function getTags(Request $request){

        $dateFor = Carbon::parse('2024-01-01');
        $dateTo = Carbon::now();

        try {
            if ($request->input('dateFor'))
                $dateFor = Carbon::parse($request->input('dateFor'));

            if ($request->input('dateTo'))
                $dateTo = Carbon::parse($request->input('dateTo'));
        } catch (\Throwable $th) {
            //
        }

        $tags = Tag::
            where('updated_at', '>=', $dateFor)
            ->where('updated_at', '<=', $dateTo)
            ->get();

        return $tags;
    }

    public function sendTag(Request $request){
        // Проверяем, что данные приходят в формате JSON
        if (!$request->isJson()) {
            return response()->json(['error' => 'Данные должны быть в формате JSON'], 400);
        }
        $request = $request->json()->all();

        Tag::create($request);

        return 'ok';
    }

    public function markerLike(Request $request){

        Tag::where('id', '=', $request['markerId'])
            ->increment('likes', 1);

        return 'ok';
    }
    public function markerDislike(Request $request){

        Tag::where('id', '=', $request['markerId'])
            ->increment('dislikes', 1);

        return 'ok';
    }

    public function pushDefault(){
        Tag::create([
            'username' => 'user',
            'description' => '3 poloski!!!',
            'lat' => 53.13,
            'lng' => 43.56,
            'type' => 'otdel',
            'likes' => 0,
            'dislikes' => 0
        ]);
    }
}
