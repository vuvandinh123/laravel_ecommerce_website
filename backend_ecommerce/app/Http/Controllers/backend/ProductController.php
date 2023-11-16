<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $category = $request->category;
        $brand =  $request->brand;
        $sortBy = $request->sortBy;
        $search = $request->search;
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 10);
        $query = Product::query();
        if(!empty($brand)) {
            $query->where('brand_id', $brand);
        }
        if(!empty($category)){
            $query->where('category_id', $category);
        }
        if (!empty($search)) {
            $query->where('products.name', 'like', '%' . $search . '%');
        }
        if ($sortBy == 'Featured') {
            $query->orderBy('products.created_at', 'asc');
        } else if ($sortBy == 'BestSelling') {
            $query->orderBy('products.created_at', 'desc');
        } else if ($sortBy == 'AlphabeticallyA-Z') {
            $query->orderBy('products.name', 'asc');
        } else if ($sortBy == 'AlphabeticallyZ-A') {
            $query->orderBy('products.name', 'desc');
        } else if ($sortBy == 'Price-low-to-high') {
            $query->orderBy('products.price', 'asc');
        } else if ($sortBy == 'Price-low-to-low') {
            $query->orderBy('products.price', 'desc');
        } else if ($sortBy == 'Date-old-to-new') {
            $query->orderBy('products.created_at', 'asc');
        } else if ($sortBy == 'Date-new-to-old') {
            $query->orderBy('products.created_at', 'desc');
        }
        $products = $query->with(['images', 'category', 'brand'])->orderBy('products.created_at', 'desc')->paginate($limit, ['*'], 'page', $page);
        $respone = [
            "status" =>200,
            'message' => "query success",
            "data" => $products,
        ];
        return response()->json($respone);
    }
    public function search(Request $request, $idCat)
    {
        $value = $request->search;
        if (!($idCat == 'all')) {
            return Product::join('categories', 'products.category_id', '=', 'categories.id')->where([['products.name', 'like', '%' . $value . '%'], ['categories.slug', $idCat]])->select('products.*')->with(['images'])->get();
        } else {
            return Product::where([['products.name', 'like', '%' . $value . '%']])->with(['images'])->get();
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $product = new Product();
        $product->name = $request->name;
        $product->slug = Str::slug($product->name, '-');
        $product->category_id = (int)$request->category;
        $product->brand_id = (int)$request->brand;
        $product->price = (float)$request->price;
        $product->retail_price = (float)$request->retail_price;
        $product->wholesale_price = (float)$request->wholesale_price;
        $product->description = $request->description;
        $product->detail = $request->detail;
        $product->metakey = $request->metakey;
        $product->metadesc = $request->metadesc;
        $product->meta_title = $request->metatitle ?? 'ko co';
        $product->visibility_home = 1;
        $product->created_by = 1;
        $product->status = (int)$request->status;
        if ($product->save()) {
            if ($request->hasFile('images')) {
                $i = 0;
                foreach ($request->file('images') as $file) {
                    $image = new Image();
                    $filename = $product->slug . Carbon::now()->format('YmdHis') . Carbon::now()->micro . $i++ . '.' . $file->getClientOriginalExtension();
                    $file->move(public_path('images'), $filename);
                    $image->image_url = $filename;
                    $image->product_id = $product->id;
                    $image->save();
                }
            }
        }
        return response()->json($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $product = Product::with(['images','category', 'brand'])->where('slug', $slug)->first();
        return $product;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,string $id)
    {
        $product = Product::find($id);
        $product->name = $request->name;
        $product->slug = Str::slug($product->name, '-');
        $product->category_id = (int)$request->category;
        $product->brand_id = (int)$request->brand;
        $product->price = (float)$request->price;
        $product->retail_price = (float)$request->retail_price;
        $product->wholesale_price = (float)$request->wholesale_price;
        $product->description = $request->description;
        $product->detail = $request->detail;
        $product->metakey = $request->metakey;
        $product->metadesc = $request->metadesc;
        $product->meta_title = $request->metatitle ?? 'ko co';
        $product->visibility_home = 1;
        $product->updated_by = 1;
        $product->status = (int)$request->status;
        $product->save();
        return response()->json($product);
    }
    public function status($id)
    {
        $product = Product::find($id);
        $product->status = $product->status == 2 ? 1 : 2;
        $product->save();
        return response()->json(array('mes' => $product->status), 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if ($id) {
            $product = Product::find($id);
            if ($product) {
                $product->images->each(function ($image) {
                    $image->delete();
                    $filePath = public_path('images/' . $image->image_url);
                    if (file_exists($filePath)) {
                        unlink($filePath);
                    }
                });
                $product->delete();
            } else {
            }
        } else {
        }
        return response()->json(array('mes' => 'thanh cong'), 200);
    }
}
