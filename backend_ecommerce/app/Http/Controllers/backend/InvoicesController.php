<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Invoice_details;
use App\Models\Invoices;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class InvoicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Invoices::query();
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 10);
        $invoids = $query->with(['details', 'details.product', 'details.supplier'])->orderBy('id', 'desc')->paginate($limit, ['*'], 'page', $page);
        return response()->json(['status' => 200, 'message' => "query success", 'data' => $invoids]);
    }
    public function search(Request $request)
    {
        $value = $request->search;
        $invoids = Invoices::where([['name', 'like', '%' . $value . '%']])->with(['details'])->get();
        return response()->json(['status' => 200, 'message' => "search success", 'data' => $invoids]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $invoice = new Invoices();
        $invoice->content = $request->content;
        $invoice->note = $request->note;
        $invoice->created_by = Auth::user()->id;
        if ($invoice->save()) {
        if ($request->details) {
            foreach ($request->details as $detail) {
                $detailNew = new Invoice_details();
                $detailNew->invoices_id = $invoice->id;
                $detailNew->product_id = $detail['product_id'];
                $detailNew->quantity = $detail['quantity'];
                $detailNew->price = $detail['price'];
                $detailNew->amount = (float)$detail['price'] * (float)$detail['quantity'];
                $detailNew->supplier_id = $detail['supplier_id'];
                $detailNew->status = 1;
                $detailNew->save();
            }
        }
        }
        return response()->json(['status' => 200, 'message' => "create success", 'data' => $invoice]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $invoice = Invoices::with(['details', 'details.product', 'details.supplier'])->where('id', $id)->first();
        if (!$invoice) {
            return response()->json(['status' => 403, 'message' => "Id doesn't exist", 'data' => $id]);
        }
        return response()->json(['status' => 200, 'message' => "show success", 'data' => $invoice]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $invoice = Invoices::find($id);
        if (!$invoice) {
            return response()->json(['status' => 403, 'error' => "Id doesn't exist"]);
        }
        $invoice->content = $request->content;
        $invoice->note = $request->note;
        $invoice->updated_by = Auth::user()->id;
        if ($invoice->save()) {
            if ($request->details) {
                foreach ($request->details as $detail) {
                    $detailNew = Invoice_details::find($detail['id']);
                    $detailNew->invoices_id = $invoice->id;
                    $detailNew->product_id = $detail['product_id'];
                    $detailNew->quantity = $detail['quantity'];
                    $detailNew->price = $detail['price'];
                    $detailNew->amount = $detail['amount'];
                    $detailNew->supplier_id = $detail['supplier_id'];
                    $detailNew->status = $detail['status'] ?? 1;
                    $detailNew->save();
                }
            }
        }
        return response()->json(['status' => 200, 'message' => "update success", 'data' => $invoice]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if ($id) {
            $invoice = Invoices::find($id);
            if ($invoice) {
                $invoice->details->each(function ($item) {
                    $item->delete();
                });
                $invoice->delete();
            }
        }
        return response()->json(['status' => 200, 'message' => "delete success", 'data' => $id]);
    }
}
