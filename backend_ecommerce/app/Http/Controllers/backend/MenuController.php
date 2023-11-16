<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Menu;
use App\Models\Order;
use App\Models\Order_detail;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Menu::query();
        $menus = $query->where([['status', '=', 1], ['type', '=', "mainmenu"]])->orderBy('sort_order', 'asc')->get();
        return response()->json(['status' => 200, 'message' => "query success", 'data' => $menus]);
    }
    public function getCategoryMenu(Request $request)
    {
        $menus = Menu::where([['status', '=', 1], ['table_name', '=', "categories"]])->orderBy('sort_order', 'asc')->get();
        $cateId = [];
        foreach ($menus as $key => $value) {
            $cateId[] = $value->table_id;
        }
        $categories = Category::whereNotIn("id", $cateId)->get();
        return response()->json(['status' => 200, 'message' => "query success", 'data' => $categories]);
    }
    public function getBrandMenu(Request $request)
    {
        $menus = Menu::where([['status', '=', 1], ['table_name', '=', "brands"]])->get();
        $brandId = [];
        foreach ($menus as $key => $value) {
            $brandId[] = $value->table_id;
        }
        $brands = Brand::whereNotIn("id", $brandId)->get();
        return response()->json(['status' => 200, 'message' => "query success", 'data' => $brands]);
    }
    public function search(Request $request)
    {
        $value = $request->search;

        $posts = Post::where([['title', 'like', '%' . $value . '%'], ['status', 1]])->get();
        return response()->json(['status' => 200, 'message' => "search success", 'data' => $posts]);
    }

    /**
     * Store a newly created resource in storage.
     */
    private function create($data, $table)
    {
        $menu = new Menu();
        $menu->name = $data->name;
        $menu->type = "mainmenu";
        $menu->link = "/" . $table."/" . $data->slug;
        $menu->sort_order =  1;
        $menu->parent_id = 0;
        $menu->table_id =  $data->id;
        $menu->table_name = $table;
        $menu->status =  1;
        $menu->created_at = now();
        $menu->save();
    }
    public function store(Request $request)
    {
        if ($request->type == "categories") {
            $data = Category::whereIn('id', $request->category)->get();
            foreach ($data as $key => $value) {
                $this->create($value, "categories");
            }
        } else if ($request->type == "brands") {
            $data = Brand::whereIn('id', $request->brand)->get();
            foreach ($data as $key => $value) {
                $this->create($value, "brands");
            }
        }
        return response()->json(['status' => 200, 'message' => "create success"]);
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
    public function updateField(Request $request, string $id)
    {
        $menu = Menu::find($id);
        $menu[$request->name] = $request->value;
        $menu->save();
        return response()->json(['status' => 200, 'message' => "update success", 'data' => $menu]);
    }
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
            $menu = Menu::find($id);
            if ($menu) {
                $menu->delete();
            } else {
                return response()->json(['status' => 403, 'message' => "Id doesn't exist", 'data' => []]);
            }
        }
        return response()->json(['status' => 200, 'message' => "delete success", 'data' => $menu]);
    }
}
