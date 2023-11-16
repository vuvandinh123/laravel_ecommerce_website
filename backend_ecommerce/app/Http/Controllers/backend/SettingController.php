<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\Brand;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Setting::query();
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 10);
        $setting = $query->orderBy('id', 'desc')->paginate($limit, ['*'], 'page', $page);
        return response()->json(['status' => 200, 'message' => "query success", 'data' => $setting]);
    }
   

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $setting = new Setting();
        $setting->name = $request->name;
        $setting->logo = $request->logo;
        $setting->description = $request->description;
        $setting->address = $request->address;
        $setting->phone = $request->phone;
        $setting->email = $request->email;
        $setting->created_at = now();
        if ($setting->save()) {
            return response()->json(['status' => 200, 'message' => "create success", 'data' => $setting]);
        }
        return response()->json(['status' => 403, 'message' => "create failed", 'data' => []]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $setting = Setting::where('id', $id)->first();
        if (!$setting) {
            return response()->json(['status' => 403, 'message' => "Id doesn't exist", 'data' => []]);
        }
        return response()->json(['status' => 200, 'message' => "show success", 'data' => $setting]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $setting = Setting::find($id);
        if (!$setting) {
            return response()->json(['status' => 403, 'error' => "Id doesn't exist", 'data' => $id]);
        }
        $setting->name = $request->name;
        $setting->logo = $request->logo;
        $setting->description = $request->description;
        $setting->address = $request->address;
        $setting->phone = $request->phone;
        $setting->email = $request->email;
        $setting->updated_at = now();
        if ($setting->save()) {
            return response()->json(['status' => 200, 'message' => "update success", 'data' => $setting]);
        }
        return response()->json(['status' => 403, 'message' => "update failed", 'data' => []]);
    }
}
