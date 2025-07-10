<?php

namespace App\Http\Controllers;

use App\Models\TagComment;
use Illuminate\Http\Request;

class TagCommentController extends Controller
{
    public function addComment(Request $request){
        
        // Проверяем, что данные приходят в формате JSON
        if (!$request->isJson()) {
            return response()->json(['error' => 'Данные должны быть в формате JSON'], 400);
        }
        $request = $request->json()->all();

        TagComment::create($request);

        return 'ok';
    }

    public function getComments(Request $request)
    {
        if ($request->input("tag_id")) {
            $tag_id = $request->input("tag_id");
        }
        else {
            return "Empty tag_id.";
        }

        if (!is_numeric($tag_id)) {
            return "tag_id is not number.";
        }

        if ($tag_id < 0) {
            return "Invalid tag_id.";
        }

        return TagComment
            ::where("tag_id", "=", $tag_id)
            ->orderByRaw("created_at")
            ->get();
    }
}