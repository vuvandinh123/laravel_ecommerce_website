<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Post;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Topic::query();
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 10);
        $topics = $query->where([['status', '=', 1]])->orderBy('id', 'desc')->paginate($limit, ['*'], 'page', $page);
        return response()->json(['status' => 200, 'message' => "query success", 'data' => $topics]);
    }
    public function search(Request $request)
    {
        $value = $request->search;
        $brands = Brand::where([['name', 'like', '%' . $value . '%']])->get();
        return response()->json(['status' => 200, 'message' => "search success", 'data' => $brands]);
    }

    public function show(string $slug)
    {
        $topic = Topic::where('slug', $slug)->first();
        if (!$topic) {
            return response()->json(['status' => 403, 'message' => "post doesn't exist", 'data' => []]);
        }
        return response()->json(['status' => 200, 'message' => "show success", 'data' => $topic]);
    }

}
