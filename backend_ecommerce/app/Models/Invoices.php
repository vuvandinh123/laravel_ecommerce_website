<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoices extends Model
{
    use HasFactory;
    protected $table = 'invoices';
    public function details()
    {
        return $this->hasMany(Invoice_details::class);
    }
    public function suppliers()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
