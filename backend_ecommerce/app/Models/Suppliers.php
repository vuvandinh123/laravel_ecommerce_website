<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Suppliers extends Model
{
    use HasFactory;
    public function Invoice_detail() {
        return $this->hasMany(Invoice_details::class,'supplier_id');
    }
}
