<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Coupons;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function index($code){
        return Coupons::where([['code','=',$code]])->first();
    }
}
