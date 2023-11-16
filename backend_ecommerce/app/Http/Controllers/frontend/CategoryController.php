<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Image;
use App\Models\Invoice_details;
use App\Models\Invoices;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Category::query();
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 20);
        $categories = $query->orderBy('id', 'desc')->paginate($limit, ['*'], 'page', $page);
        return response()->json(['status' => 200, 'message' => "query success", 'data' => $categories]);
    }
    public function search(Request $request)
    {
        $value = $request->search;
        $categories = Invoices::where([['name', 'like', '%' . $value . '%']])->with(['details'])->get();
        return response()->json(['status' => 200, 'message' => "search success", 'data' => $categories]);
    }
    
    public function show(string $id)
    {
        $Category = Category::where('id', $id)->first();
        if (!$Category) {
            return response()->json(['status' => 403, 'message' => "Id doesn't exist", 'data' => $id]);
        }
        return response()->json(['status' => 200, 'message' => "show success", 'data' => $Category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['status' => 403, 'error' => "Id doesn't exist", 'data' => $id]);
        }
        $category->name = $request->name;
        $category->slug = Str::slug($request->name);
        $category->image = $request->image;
        $category->parent_id = $request->parent_id;
        $category->metakey = $request->metakey;
        $category->metadesc = $request->metadesc;
        $category->status = $request->status;
        $category->updated_at = now();
        $image = $request->file('image');
        $category->updated_by = Auth::user()->id;
        // return response()->json(['status' => 200, 'message' => "update success", 'data' => $category]);
        if (isset($image)) {
            $filePath = public_path('images/' . $category->image);
            if (file_exists($filePath)) {
                unlink($filePath);
            }
            $filename = $category->slug . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $filename);
            $category->image = $filename;
        }
        if ($category->save()) {
            return response()->json(['status' => 200, 'message' => "update success", 'data' => $category]);
        }
        return response()->json(['status' => 403, 'message' => "update failed", 'data' => $category]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if ($id) {
            $category = Category::find($id);
            if ($category) {
                if (count($category->products) > 0) {
                    return response()->json(['status' => 401, 'message' => "Deletion failed because the product exists", 'data' => '']);
                }
                $category->delete();
            } else {
                return response()->json(['status' => 403, 'message' => "Id doesn't exist", 'data' => []]);
            }
        }
        return response()->json(['status' => 200, 'message' => "delete success", 'data' => $category->products]);
    }
}
