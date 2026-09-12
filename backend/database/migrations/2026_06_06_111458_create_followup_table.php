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
    Schema::create('followup', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('enquiry_id');
        $table->date('followupdate');
        $table->string('remarks');
        $table->string('status');
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('followup');
}
};
