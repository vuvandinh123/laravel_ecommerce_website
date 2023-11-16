<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;

use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $topic = $query->orderBy('id', 'desc')->paginate($limit, ['*'], 'page', $page);
        return response()->json(['status' => 200, 'message' => "query success", 'data' => $topic]);
    }
    public function search(Request $request)
    {
        $value = $request->search;
        $topics = Topic::where([['name', 'like', '%' . $value . '%']])->get();
        return response()->json(['status' => 200, 'message' => "search success", 'data' => $topics]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $topic = new Topic();
        $topic->name = $request->name;
        $topic->slug = Str::slug($request->name);
        $topic->status = $request->status ?? 1;
        $topic->created_at = now();
        $topic->created_by = Auth::user()->id;
        if ($topic->save()) {
            return response()->json(['status' => 200, 'message' => "create success", 'data' => $topic]);
        }
        return response()->json(['status' => 403, 'message' => "create failed", 'data' => []]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $topic = Topic::where('id', $id)->first();
        if (!$topic) {
            return response()->json(['status' => 403, 'message' => "Id doesn't exist", 'data' => []]);
        }
        return response()->json(['status' => 200, 'message' => "show success", 'data' => $topic]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $topic = Topic::find($id);
        if (!$topic) {
            return response()->json(['status' => 403, 'error' => "Id doesn't exist", 'data' => $id]);
        }
        $topic->name = $request->name;
        $topic->slug = Str::slug($request->name);
        $topic->status = $request->status ?? 1;
        $topic->updated_at = now();
        $topic->updated_by = Auth::user()->id;
        if ($topic->save()) {
            return response()->json(['status' => 200, 'message' => "update success", 'data' => $topic]);
        }
        return response()->json(['status' => 403, 'message' => "update failed", 'data' => $topic]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if ($id) {
            $topic = Topic::find($id);
            if ($topic) {
                if (count($topic->posts) > 0) {
                    return response()->json(['status' => 401, 'message' => "Deletion failed because the product exists", 'data' => []]);
                }
                $topic->delete();
            } else {
                return response()->json(['status' => 403, 'message' => "Id doesn't exist", 'data' => []]);
            }
        }
        return response()->json(['status' => 200, 'message' => "delete success", 'data' => $topic]);
    }
}
