<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // followup table - missing log_status
        Schema::table('followup', function (Blueprint $table) {
            if (!Schema::hasColumn('followup', 'log_status')) {
                $table->tinyInteger('log_status')->default(1)->after('status');
            }
        });

        // product_enquiries table - missing log_status
        Schema::table('product_enquiries', function (Blueprint $table) {
            if (!Schema::hasColumn('product_enquiries', 'log_status')) {
                $table->tinyInteger('log_status')->default(1)->after('message');
            }
        });
    }

    public function down(): void
    {
        Schema::table('followup', function (Blueprint $table) {
            $table->dropColumn('log_status');
        });

        Schema::table('product_enquiries', function (Blueprint $table) {
            $table->dropColumn('log_status');
        });
    }
};
