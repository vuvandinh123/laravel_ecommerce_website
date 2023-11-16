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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name',1000);
            $table->string('slug',1000);
            $table->string('image',1000)->nulltable();
            $table->unsignedInteger('parent_id');
            $table->string('metakey',255);
            $table->string('metadesc',255);
            $table->integer('created_by')->default(1);
            $table->integer('updated_by')->nulltable();
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
