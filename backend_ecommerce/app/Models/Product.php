<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    public function images()
    {
        return $this->hasMany(Product_image::class);
    }
    public function category() {
        return $this->belongsTo(Category::class);
    }
  
    public function brand() {
        return $this->belongsTo(Brand::class);
    }
    public function colors()
    {
        return $this->belongsToMany(Color::class, 'products_colors')
            ->select(['colors.id', 'colors.name'])->withPivot(['quantity','price']);
    }
    
    public function sizes()
    {
        return $this->belongsToMany(Size::class, 'products_sizes')
            ->select(['sizes.id', 'sizes.name'])->withPivot(['quantity','price']);
    }
    public function discount()
    {
        return $this->belongsToMany(Discount::class, 'product_discounts');
    }
}
