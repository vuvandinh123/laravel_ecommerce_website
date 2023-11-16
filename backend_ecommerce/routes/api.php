<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('products')->group(function () {
    Route::get('/', 'App\Http\Controllers\frontend\ProductController@index');
    Route::get('/featured', 'App\Http\Controllers\frontend\ProductController@featured');
    Route::get('/top_selling', 'App\Http\Controllers\frontend\ProductController@top_selling');
    Route::post('/search/{id}', 'App\Http\Controllers\frontend\ProductController@search');
    Route::get('/{slug}', 'App\Http\Controllers\frontend\ProductController@show');
    Route::get('/categories/{id}', 'App\Http\Controllers\frontend\ProductController@productByCategory');
});

Route::get('/discount/products', 'App\Http\Controllers\frontend\ProductDiscountController@index');
Route::get('/categories', 'App\Http\Controllers\frontend\CategoryController@index');
Route::get('/brands', 'App\Http\Controllers\frontend\BrandController@index');
Route::prefix('auth')->group(function () {
    Route::post('login', 'App\Http\Controllers\backend\AuthController@login');
    Route::post('singup', 'App\Http\Controllers\backend\AuthController@singup');
});
Route::prefix('post')->group(function () {
    Route::get('/', 'App\Http\Controllers\frontend\PostController@index');
    Route::get('/{slug}', 'App\Http\Controllers\frontend\PostController@show');
    Route::post('/search', 'App\Http\Controllers\frontend\PostController@search');
});
Route::prefix('topic')->group(function () {
    Route::get('/', 'App\Http\Controllers\frontend\TopicController@index');
    Route::get('/{slug}', 'App\Http\Controllers\frontend\TopicController@show');
});
Route::get('/menus', 'App\Http\Controllers\frontend\MenuController@index');
Route::get('/baskets', 'App\Http\Controllers\frontend\OrderController@baskets');

Route::prefix('page')->group(function () {
    Route::get('/{slug}', 'App\Http\Controllers\frontend\PageController@show');
});
Route::group([
    'middleware' => ['auth:api'],
], function () {
    Route::prefix('orders')->group(function () {
        Route::get('/{id}', 'App\Http\Controllers\frontend\OrderController@index');
        Route::get('/{id}/show', 'App\Http\Controllers\frontend\OrderController@show');
        Route::post('/', 'App\Http\Controllers\frontend\OrderController@store');
        Route::put('/{id}', 'App\Http\Controllers\frontend\OrderController@update');
        Route::delete('/{id}', 'App\Http\Controllers\frontend\OrderController@destroy');
    });
});
Route::prefix('admin')->group(function () {
    Route::post('login', 'App\Http\Controllers\backend\AuthController@login');
    Route::group([
        'middleware' => ['auth:api'],
    ], function () {
        Route::prefix('auth')->group(function () {
            Route::get('user', 'App\Http\Controllers\backend\AuthController@user');
            Route::post('logout', 'App\Http\Controllers\backend\AuthController@logout');
        });
        Route::prefix('products')->group(function () {
            Route::get('/', 'App\Http\Controllers\backend\ProductController@index');
            Route::post('/', 'App\Http\Controllers\backend\ProductController@store');
            Route::get('{slug}', 'App\Http\Controllers\backend\ProductController@show');
            Route::delete('{id}', 'App\Http\Controllers\backend\ProductController@destroy');
            Route::put('status/{id}', 'App\Http\Controllers\backend\ProductController@status');
            Route::put('/{id}', 'App\Http\Controllers\backend\ProductController@update');
        });
        Route::prefix('menus')->group(function () { 
            Route::get('/', 'App\Http\Controllers\backend\MenuController@index');
            Route::post('/', 'App\Http\Controllers\backend\MenuController@store');
            Route::get('/category', 'App\Http\Controllers\backend\MenuController@getCategoryMenu');
            Route::post('/field/{id}', 'App\Http\Controllers\backend\MenuController@updateField');
            // Route::get('{slug}', 'App\Http\Controllers\backend\ProductController@show');
            Route::delete('{id}', 'App\Http\Controllers\backend\MenuController@destroy');
            // Route::put('status/{id}', 'App\Http\Controllers\backend\ProductController@status');
            // Route::put('/{id}', 'App\Http\Controllers\backend\ProductController@update');
        });
        Route::prefix('contacts')->group(function () {
            Route::get('/', 'App\Http\Controllers\backend\ContactController@index');
            Route::post('/', 'App\Http\Controllers\backend\ContactController@store');
            Route::get('{slug}', 'App\Http\Controllers\backend\ContactController@show');
            Route::delete('{id}', 'App\Http\Controllers\backend\ContactController@destroy');
            Route::put('status/{id}', 'App\Http\Controllers\backend\ContactController@status');
            Route::put('/{id}', 'App\Http\Controllers\backend\ContactController@update');
        });
        Route::prefix('categories')->group(function () {
            Route::get('/', 'App\Http\Controllers\backend\CategoryController@index');
            Route::post('/', 'App\Http\Controllers\backend\CategoryController@store');
            Route::put('status/{id}', 'App\Http\Controllers\backend\CategoryController@status');
            Route::get('/{id}', 'App\Http\Controllers\backend\CategoryController@show');
            Route::post('/{id}', 'App\Http\Controllers\backend\CategoryController@update');
            Route::delete('/{id}', 'App\Http\Controllers\backend\CategoryController@destroy');
        });
        Route::prefix('brands')->group(function () {
            Route::get('/', 'App\Http\Controllers\backend\BrandController@index');
            Route::post('/', 'App\Http\Controllers\backend\BrandController@store');
            Route::put('status/{id}', 'App\Http\Controllers\backend\BrandController@status');
            Route::get('/{id}', 'App\Http\Controllers\backend\BrandController@show');
            Route::post('/{id}', 'App\Http\Controllers\backend\BrandController@update');
            Route::delete('/{id}', 'App\Http\Controllers\backend\BrandController@destroy');
        });
        Route::prefix('posts')->group(function () {
            Route::get('/', 'App\Http\Controllers\backend\PostController@index');
            Route::post('/', 'App\Http\Controllers\backend\PostController@store');
            Route::get('/{id}', 'App\Http\Controllers\backend\PostController@show');
            Route::put('/{id}', 'App\Http\Controllers\backend\PostController@update');
            Route::delete('/{id}', 'App\Http\Controllers\backend\PostController@destroy');
        });
        Route::prefix('pages')->group(function () {
            Route::get('/', 'App\Http\Controllers\backend\PageController@index');
            Route::post('/', 'App\Http\Controllers\backend\PageController@store');
            Route::get('/{id}', 'App\Http\Controllers\backend\PageController@show');
            Route::put('/{id}', 'App\Http\Controllers\backend\PageController@update');
            Route::delete('/{id}', 'App\Http\Controllers\backend\PageController@destroy');
        });
        Route::prefix('topics')->group(function () {
            Route::get('/', 'App\Http\Controllers\backend\TopicController@index');
            Route::post('/', 'App\Http\Controllers\backend\TopicController@store');
            Route::get('/{id}', 'App\Http\Controllers\backend\TopicController@show');
            Route::put('/{id}', 'App\Http\Controllers\backend\TopicController@update');
            Route::delete('/{id}', 'App\Http\Controllers\backend\TopicController@destroy');
        });
        Route::prefix('contacts')->group(function () {
            Route::get('/', 'App\Http\Controllers\backend\ContactController@index');
            Route::post('/', 'App\Http\Controllers\backend\ContactController@store');
            Route::get('/{id}', 'App\Http\Controllers\backend\ContactController@show');
            Route::put('/{id}', 'App\Http\Controllers\backend\ContactController@update');
            Route::delete('/{id}', 'App\Http\Controllers\backend\ContactController@destroy');
        });
        Route::prefix('settings')->group(function () {
            Route::get('/', 'App\Http\Controllers\backend\SettingController@index');
            Route::post('/', 'App\Http\Controllers\backend\SettingController@store');
            Route::get('/{id}', 'App\Http\Controllers\backend\SettingController@show');
            Route::put('/{id}', 'App\Http\Controllers\backend\SettingController@update');
            Route::delete('/{id}', 'App\Http\Controllers\backend\SettingController@destroy');
        });
        Route::prefix('suppliers')->group(function () {
            Route::get('/', 'App\Http\Controllers\backend\SuppliersController@index');
            Route::post('/', 'App\Http\Controllers\backend\SuppliersController@store');
            Route::get('/{id}', 'App\Http\Controllers\backend\SuppliersController@show');
            Route::put('/{id}', 'App\Http\Controllers\backend\SuppliersController@update');
            Route::delete('/{id}', 'App\Http\Controllers\backend\SuppliersController@destroy');
        });
        Route::prefix('invoices')->group(function () {
            Route::get('/', 'App\Http\Controllers\backend\InvoicesController@index');
            Route::post('/', 'App\Http\Controllers\backend\InvoicesController@store');
            Route::get('/{id}', 'App\Http\Controllers\backend\InvoicesController@show');
            Route::put('/{id}', 'App\Http\Controllers\backend\InvoicesController@update');
            Route::delete('/{id}', 'App\Http\Controllers\backend\InvoicesController@destroy');
        });
        Route::prefix('orders')->group(function () {
            Route::get('/', 'App\Http\Controllers\backend\OrderController@index');
            Route::post('/', 'App\Http\Controllers\backend\OrderController@store');
            Route::get('/{id}', 'App\Http\Controllers\backend\OrderController@show');
            Route::put('/{id}', 'App\Http\Controllers\backend\OrderController@update');
            Route::delete('/{id}', 'App\Http\Controllers\backend\OrderController@destroy');
        });
    });
});



// Route::get('/brands', 'App\Http\Controllers\api\BrandController@index');
// Route::get('/categories/{slug}', 'App\Http\Controllers\api\CategoryController@show');

// Route::get('/brands/{slug}', 'App\Http\Controllers\api\BrandController@getCategory');
// Route::get('/coupon/{code}', 'App\Http\Controllers\api\CouponController@index');
// Route::get('/shipping', 'App\Http\Controllers\api\ShippingController@index');
// // Route::post('/auth', 'App\Http\Controllers\backend\AuthController@login');


// Route::get('/colors', 'App\Http\Controllers\api\ColorController@index');
// Route::post('/upload', 'App\Http\Controllers\api\ImageController@create');
