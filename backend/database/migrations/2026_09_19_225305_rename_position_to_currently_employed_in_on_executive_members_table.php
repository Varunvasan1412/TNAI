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
        Schema::table('executive_members', function (Blueprint $table) {
            $table->renameColumn('position', 'currently_employed_in');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('executive_members', function (Blueprint $table) {
            $table->renameColumn('currently_employed_in', 'position');
        });
    }
};
