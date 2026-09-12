<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('subject');
            $table->text('message');
            $table->timestamps();
        });
        Schema::table('enquiries', function (Blueprint $table) {
           $table->boolean('convert')->default(0);
           $table->date('current_followup_date')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('enquiries');
    }



};