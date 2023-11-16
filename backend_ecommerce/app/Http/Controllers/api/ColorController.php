<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ColorController extends Controller
{
    public function index(){
        return Color::leftJoin('products_colors', 'colors.id', '=', 'products_colors.color_id')
        ->select('colors.*', DB::raw('COUNT(products_colors.id) as product_count'))
        ->groupBy('colors.id')
        ->get();
    }
}
