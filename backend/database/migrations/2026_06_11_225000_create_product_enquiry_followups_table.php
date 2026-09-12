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
        Schema::create('product_enquiry_followups', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_enquiry_id');
            $table->date('followupdate')->nullable();
            $table->string('remarks')->nullable();
            $table->string('status')->nullable();
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
        Schema::dropIfExists('product_enquiry_followups');
    }
};
