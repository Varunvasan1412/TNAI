<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::rename('enquiries', 'enquiry');

        Schema::table('enquiry', function (Blueprint $table) {
            $table->tinyInteger('status')->default(1)->after('current_followup_date');
        });

        Schema::table('enquiry', function (Blueprint $table) {
            $table->tinyInteger('log_status')->default(1)->after('status')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('enquiry', function (Blueprint $table) {
            $table->tinyInteger('log_status')->default(1)->after('enquiry_no')->change();
        });

        Schema::table('enquiry', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::rename('enquiry', 'enquiries');
    }
};
