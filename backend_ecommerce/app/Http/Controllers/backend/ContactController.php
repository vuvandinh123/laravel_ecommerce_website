<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Contact::query();
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 10);
        $contacts = $query->orderBy('id', 'desc')->paginate($limit, ['*'], 'page', $page);
        return response()->json(['status' => 200, 'message' => "query success", 'data' => $contacts]);
    }
    public function search(Request $request)
    {
        $value = $request->search;
        $contacts = Contact::where([['name', 'like', '%' . $value . '%']])->get();
        return response()->json(['status' => 200, 'message' => "search success", 'data' => $contacts]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $contact = new Contact();
        $contact->title = $request->title;
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->note = $request->note;
        $contact->status = $request->status ?? 1;
        $contact->created_at = now();
        if ($contact->save()) {
            return response()->json(['status' => 200, 'message' => "create success", 'data' => $contact]);
        }
        return response()->json(['status' => 403, 'message' => "create failed", 'data' => []]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $contact = Contact::where('id', $id)->first();
        if (!$contact) {
            return response()->json(['status' => 403, 'message' => "Id doesn't exist", 'data' => []]);
        }
        return response()->json(['status' => 200, 'message' => "show success", 'data' => $contact]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $contact = Contact::find($id);
        if (!$contact) {
            return response()->json(['status' => 403, 'error' => "Id doesn't exist", 'data' => $id]);
        }
        $contact->title = $request->title;
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->note = $request->note;
        $contact->status = $request->status ?? 1;
        $contact->updated_at = now();
        if ($contact->save()) {
            return response()->json(['status' => 200, 'message' => "update success", 'data' => $contact]);
        }
        return response()->json(['status' => 403, 'message' => "update failed", 'data' => []]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if ($id) {
            $contact = Contact::find($id);
            if ($contact) {
                $contact->delete();
            } else {
                return response()->json(['status' => 403, 'message' => "Id doesn't exist", 'data' => []]);
            }
        }
        return response()->json(['status' => 200, 'message' => "delete success", 'data' => $contact]);
    }
}
