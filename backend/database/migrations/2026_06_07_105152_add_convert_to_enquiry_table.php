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
        if (!Schema::hasColumn('enquiry', 'convert')) {
            Schema::table('enquiry', function (Blueprint $table) {
                $table->tinyInteger('convert')->default(0)->after('current_followup_date');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('enquiry', function (Blueprint $table) {
            $table->dropColumn('convert');
        });
    }
};
