<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\brand_categories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BrandController extends Controller
{
    public function index(){
        return Brand::leftJoin('products', 'brands.id', '=', 'products.brand_id')
        ->select('brands.*', DB::raw('COUNT(products.brand_id) as product_count'))
        ->groupBy('brands.id')
        ->get();
    }
    public function getCategory($slug){
        return brand_categories::join('categories', 'brand_categories.category_id', '=', 'categories.id')
        ->join('brands', 'brands.id', '=','brand_categories.brand_id')
        ->leftJoin('products', 'brands.id', '=', 'products.brand_id')
        ->select('brands.*', DB::raw('COUNT(products.brand_id) as product_count')) 
        ->where('categories.slug', $slug)
        ->groupBy('brands.id')
        ->get();
    }
}
