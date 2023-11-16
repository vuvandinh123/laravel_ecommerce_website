<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('discounts', function (Blueprint $table) {
            $table->id();
            $table->decimal('discount_percent', 5, 2); // Phần trăm giảm giá
            $table->string('type',255);
            $table->dateTime('start_date'); // Ngày bắt đầu ưu đãi
            $table->dateTime('end_date'); // Ngày kết thúc ưu đãi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discounts');
    }
};
