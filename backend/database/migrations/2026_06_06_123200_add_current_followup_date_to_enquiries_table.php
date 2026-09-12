<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
   public function up(): void
{
    if (!Schema::hasColumn('enquiries', 'current_followup_date')) {
        Schema::table('enquiries', function (Blueprint $table) {
            $table->date('current_followup_date')->nullable();
        });
    }
}

public function down(): void
{
    if (Schema::hasColumn('enquiries', 'current_followup_date')) {
        Schema::table('enquiries', function (Blueprint $table) {
            $table->dropColumn('current_followup_date');
        });
    }
}
};
    