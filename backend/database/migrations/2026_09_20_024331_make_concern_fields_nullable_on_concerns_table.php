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
        Schema::table('concerns', function (Blueprint $table) {
            $table->string('aadhar_number')->nullable()->change();
            $table->string('mobile_number')->nullable()->change();
            $table->string('concern_category')->nullable()->change();
            $table->string('title')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('concerns', function (Blueprint $table) {
            $table->string('snai_membership_number')->nullable(false)->change();
            $table->string('mobile_number')->nullable(false)->change();
            $table->string('concern_category')->nullable(false)->change();
            $table->string('subject')->nullable(false)->change();
        });
    }
};
