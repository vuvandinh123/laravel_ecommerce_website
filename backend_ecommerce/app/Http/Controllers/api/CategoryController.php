<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\categories_attributes;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Category::all();
    }

    public function getCategory_filter($slug)
    {
    //     $query = Categories_attributes::join('categories', 'categories_attributes.category_id', '=', 'categories.id')->join('values', 'categories_attributes.value_id', '=', 'values.id')->select('categories.*', 'values.name AS value_name');
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $category = Category::where('slug', $request->slug)->first();
        return $category;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
