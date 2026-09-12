<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add deleted_at to blogs table
        Schema::table('blogs', function (Blueprint $table) {
            if (!Schema::hasColumn('blogs', 'deleted_at')) {
                $table->softDeletes();
            }
        });

        // Add deleted_at to enquiry table
        Schema::table('enquiry', function (Blueprint $table) {
            if (!Schema::hasColumn('enquiry', 'deleted_at')) {
                $table->softDeletes();
            }
        });

        // Add deleted_at to followup table
        Schema::table('followup', function (Blueprint $table) {
            if (!Schema::hasColumn('followup', 'deleted_at')) {
                $table->softDeletes();
            }
        });

        // Add deleted_at to product_enquiries table
        Schema::table('product_enquiries', function (Blueprint $table) {
            if (!Schema::hasColumn('product_enquiries', 'deleted_at')) {
                $table->softDeletes();
            }
        });
    }

    public function down(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('enquiry', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('followup', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('product_enquiries', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
