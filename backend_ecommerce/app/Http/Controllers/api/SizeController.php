<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SizeController extends Controller
{
    public function index(){
        return Size::leftJoin('products_sizes', 'sizes.id', '=', 'products_sizes.size_id')
        ->select('sizes.*', DB::raw('COUNT(products_sizes.id) as product_count'))
        ->groupBy('sizes.id')
        ->get();
    }
}
