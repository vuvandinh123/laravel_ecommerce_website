<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Attributes;
use App\Models\Categories_attributes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AttributesController extends Controller
{
    public function index(){
        return Attributes::with(['value'])->get();
    }
   
}
