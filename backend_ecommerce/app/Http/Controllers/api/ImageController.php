<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Coupons;
use App\Models\Image;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function index($code){
        return Coupons::where([['code','=',$code]])->first();
    }
    public function create(Request $request){
        if ($request->hasFile('images')) {
            $i = 0;
            foreach ($request->file('images') as $file) {
                $image = new Image();
                $filename = "ghjkldew" . Carbon::now()->format('YmdHis') . Carbon::now()->micro . $i++ . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('images'), $filename);
                $image->image_url = $filename;
                $image->product_id = 1;
                // $image->save();
            }
            return "hello";
        }
        return response()->json($request);
    }
}
