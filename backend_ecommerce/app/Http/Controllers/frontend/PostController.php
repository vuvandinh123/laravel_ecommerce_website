<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Post::query();
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 10);
        $posts = $query->where([['status', '=', 1],['type','=', 'post']])->orderBy('id', 'desc')->paginate($limit, ['*'], 'page', $page);
        return response()->json(['status' => 200, 'message' => "query success", 'data' => $posts]);
    }
    public function search(Request $request)
    {
        $value = $request->search;
        $posts = Post::where([['title', 'like', '%' . $value . '%'],['status',1]])->get();
        return response()->json(['status' => 200, 'message' => "search success", 'data' => $posts]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $brand = new Brand();
        $brand->name = $request->name;
        $brand->slug = Str::slug($request->name);
        $brand->image = $request->image;
        $brand->metakey = $request->metakey;
        $brand->metadesc = $request->metadesc;
        $brand->status = $request->status ?? 1;
        $brand->created_at = now();
        $brand->created_by = Auth::user()->id;
        $image = $request->file('image');
        if (isset($image)) {
            $filename = $brand->slug . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $filename);
            $brand->image = $filename;
        }
        if ($brand->save()) {
            return response()->json(['status' => 200, 'message' => "create success", 'data' => $brand]);
        }
        return response()->json(['status' => 403, 'message' => "create failed", 'data' => []]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $post = Post::where('slug', $slug)->first();
        if (!$post) {
            return response()->json(['status' => 403, 'message' => "post doesn't exist", 'data' => []]);
        }
        return response()->json(['status' => 200, 'message' => "show success", 'data' => $post]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json(['status' => 403, 'error' => "Id doesn't exist", 'data' => $id]);
        }
        $brand->name = $request->name;
        $brand->slug = Str::slug($request->name);
        $brand->image = $request->image;
        $brand->metakey = $request->metakey;
        $brand->metadesc = $request->metadesc;
        $brand->status = $request->status ?? 1;
        $brand->updated_at = now();
        $brand->updated_by = Auth::user()->id;
        $image = $request->file('image');
        if (isset($image)) {
            $filePath = public_path('images/' . $brand->image);
            if (file_exists($filePath)) {
                unlink($filePath);
            }
            $filename = $brand->slug . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $filename);
            $brand->image = $filename;
        }
        if ($brand->save()) {
            return response()->json(['status' => 200, 'message' => "update success", 'data' => $brand]);
        }
        return response()->json(['status' => 403, 'message' => "update failed", 'data' => $brand]);
    }
    public function status($id)
    {
        $Brand = Brand::find($id);
        $Brand->status = $Brand->status == 2 ? 1 : 2;
        $Brand->save();
        return response()->json(array('mes' => $Brand->status), 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if ($id) {
            $brand = Brand::find($id);
            if ($brand) {
                if (count($brand->products) > 0) {
                    return response()->json(['status' => 401, 'message' => "Deletion failed because the product exists", 'data' => []]);
                }
                $brand->delete();
            } else {
                return response()->json(['status' => 403, 'message' => "Id doesn't exist", 'data' => []]);
            }
        }
        return response()->json(['status' => 200, 'message' => "delete success", 'data' => $brand]);
    }
}
