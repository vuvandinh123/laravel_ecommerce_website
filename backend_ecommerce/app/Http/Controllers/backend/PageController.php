<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\Brand;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Post::query();
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 10);
        $posts = $query->where([['status',1],['type','page']])->orderBy('id', 'desc')->paginate($limit, ['*'], 'page', $page);
        return response()->json(['status' => 200, 'message' => "query success", 'data' => $posts]);
    }
    public function search(Request $request)
    {
        $value = $request->search;
        $brands = Brand::where([['name', 'like', '%' . $value . '%'],['status',1],['type','page']])->get();
        return response()->json(['status' => 200, 'message' => "search success", 'data' => $brands]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $post = new post();
        $post->title = $request->title;
        $post->topic_id = 1;
        $post->slug = Str::slug($request->title);
        $post->image = $request->image;
        $post->compact = $request->compact;
        $post->content = $request->content;
        $post->status = $request->status ?? 1;
        $post->created_at = now();
        $post->type = "page";
        $post->created_by = Auth::user()->id;
        if ($post->save()) {
            return response()->json(['status' => 200, 'message' => "create success", 'data' => $post]);
        }
        return response()->json(['status' => 403, 'message' => "create failed", 'data' => []]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::where('id', $id)->first();
        if (!$post) {
            return response()->json(['status' => 403, 'message' => "Id doesn't exist", 'data' => []]);
        }
        return response()->json(['status' => 200, 'message' => "show success", 'data' => $post]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['status' => 403, 'error' => "Id doesn't exist", 'data' => []]);
        }
        $post->title = $request->title;
        $post->topic_id = $request->topic_id;
        $post->slug = Str::slug($request->title);
        $post->image = $request->image;
        $post->compact = $request->compact;
        $post->content = $request->content;
        $post->status = $request->status ?? 1;
        $post->updated_at = now();
        $post->updated_by = Auth::user()->id;
        if ($post->save()) {
            return response()->json(['status' => 200, 'message' => "update success", 'data' => $post]);
        }
        return response()->json(['status' => 403, 'message' => "update failed", 'data' => $post]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if ($id) {
            $post = Post::find($id);
            if ($post) {
                $post->delete();
            } else {
                return response()->json(['status' => 403, 'message' => "Id doesn't exist", 'data' => []]);
            }
        }
        return response()->json(['status' => 200, 'message' => "delete success", 'data' => $post]);
    }
}
