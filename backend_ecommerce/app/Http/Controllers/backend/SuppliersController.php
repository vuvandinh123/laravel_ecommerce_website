<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Suppliers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class SuppliersController extends Controller
{
    
   
    public function index(Request $request)
    {
        $query = Suppliers::query();
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 10);
        $Suppliers = $query->with("Invoice_detail")->orderBy('id', 'desc')->paginate($limit, ['*'], 'page', $page);
        return response()->json(['status' => 200, 'message' => "query success", 'data' => $Suppliers]);
    }
    public function search(Request $request)
    {
        $value = $request->search;
        $Suppliers = Suppliers::where([['name', 'like', '%' . $value . '%']])->get();
        return response()->json(['status' => 200, 'message' => "search success", 'data' => $Suppliers]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $Suppliers = new Suppliers();
        $Suppliers->name = $request->name;
        $Suppliers->address = $request->address;
        $Suppliers->email = $request->email;
        $Suppliers->status = $request->status ?? 1;
        $Suppliers->created_at = now();
        $Suppliers->created_by = Auth::user()->id;
        if ($Suppliers->save()) {
            return response()->json(['status' => 200, 'message' => "create success", 'data' => $Suppliers]);
        }
        return response()->json(['status' => 403, 'message' => "create failed", 'data' => []]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $Suppliers = Suppliers::where('id', $id)->first();
        if (!$Suppliers) {
            return response()->json(['status' => 403, 'message' => "Id doesn't exist", 'data' => []]);
        }
        return response()->json(['status' => 200, 'message' => "show success", 'data' => $Suppliers]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $Suppliers = Suppliers::find($id);
        if (!$Suppliers) {
            return response()->json(['status' => 403, 'error' => "Id doesn't exist", 'data' => $id]);
        }
        $Suppliers->name = $request->name;
        $Suppliers->address = $request->address;
        $Suppliers->email = $request->email;
        $Suppliers->status = $request->status ?? 1;
        $Suppliers->updated_at = now();
        $Suppliers->updated_by = Auth::user()->id;
        if ($Suppliers->save()) {
            return response()->json(['status' => 200, 'message' => "update success", 'data' => $Suppliers]);
        }
        return response()->json(['status' => 403, 'message' => "update failed", 'data' => $Suppliers]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if ($id) {
            $Suppliers = Suppliers::find($id);
            if ($Suppliers) {
                if (count($Suppliers->Invoice_detail) > 0) {
                    return response()->json(['status' => 401, 'message' => "Deletion failed because the Invoice detail exists", 'data' => []]);
                }
                $Suppliers->delete();
            } else {
                return response()->json(['status' => 403, 'message' => "Id doesn't exist", 'data' => []]);
            }
        }
        return response()->json(['status' => 200, 'message' => "delete success", 'data' => $Suppliers]);
    }
}
