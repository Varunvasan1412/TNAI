<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::table('enquiries', function (Blueprint $table) {
        $table->tinyInteger('log_status')->default(1)->after('enquiry_no');
    });
}

public function down(): void
{
    Schema::table('enquiries', function (Blueprint $table) {
        $table->dropColumn('log_status');
    });
}
};
