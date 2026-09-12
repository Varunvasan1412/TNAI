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
        Schema::create('product_section_fields', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_section_id')->nullable();
            $table->string('field_type')->nullable(); // text, number, rich_text, table, image, file
            $table->string('field_label')->nullable();
            $table->longText('field_value')->nullable();
            $table->string('file_path')->nullable();
            $table->integer('order_index')->default(0);
            $table->tinyInteger('status')->default(1);
            $table->tinyInteger('log_status')->default(1);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_section_fields');
    }
};
