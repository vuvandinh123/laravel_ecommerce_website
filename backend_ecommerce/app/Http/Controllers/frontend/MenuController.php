<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Brand;
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
        $menus = $query->where([['status', '=', 1]])->orderBy('sort_order', 'asc')->get();
        return response()->json(['status' => 200, 'message' => "query success", 'data' => $menus]);
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
        $order = new Order();
        $order->user_id = Auth::user()->id;
        $order->firstName = $request->firstName;
        $order->lastName = $request->lastName;
        $order->email = $request->email;
        $order->phone = $request->phone;
        $order->address = $request->address;
        $order->note = $request->note;
        $order->status = $request->status ?? 1;
        $order->created_at = now();
        if ($order->save()) {
            if ($request->order_detail) {
                foreach ($request->order_detail as $detail) {
                    $detailNew = new Order_detail();
                    $detailNew->order_id = $order->id;
                    $detailNew->product_id = $detail['product_id'];
                    $detailNew->shipping_id = $detail['shipping_id'];
                    $detailNew->quantity = $detail['quantity'];
                    $detailNew->price = $detail['price'];
                    $detailNew->total = (float)$detail['price'] * (float)$detail['quantity'];
                    $detailNew->save();
                }
            }
            return response()->json(['status' => 200, 'message' => "create success", 'data' => $order]);
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
