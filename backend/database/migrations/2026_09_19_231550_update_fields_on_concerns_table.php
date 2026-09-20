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
            $table->renameColumn('snai_membership_number', 'aadhar_number');
            $table->renameColumn('subject', 'title');
            $table->string('concern_category')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('concerns', function (Blueprint $table) {
            $table->renameColumn('aadhar_number', 'snai_membership_number');
            $table->renameColumn('title', 'subject');
            $table->string('concern_category')->nullable(false)->change();
        });
    }
};
