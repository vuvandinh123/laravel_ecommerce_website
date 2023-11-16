<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductDiscountController extends Controller
{
    public function index(){
        $totalProducts = Product::count();
        $products =  Product::join('product_discounts','products.id','=','product_discounts.product_id')
        ->select("products.*")
        ->with(['discount','images'])
        ->get();
        $respone = [
            "total" => $totalProducts,
            "data" => $products,
        ];
        return response()->json($respone);
    }
}
