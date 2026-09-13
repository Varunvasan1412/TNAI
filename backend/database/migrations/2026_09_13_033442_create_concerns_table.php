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
        Schema::create('concerns', function (Blueprint $table) {
            $table->id();

            // Member Fields
            $table->string('member_name');
            $table->string('tnai_membership_number');
            $table->string('snai_membership_number');
            $table->string('email');
            $table->string('mobile_number');
            $table->string('institution')->nullable();
            $table->string('branch_zone')->nullable();
            $table->string('concern_category');
            $table->string('subject');
            $table->text('description');
            $table->string('attachment'); // File path

            // Management Fields
            $table->enum('concern_status', ['pending', 'in_progress', 'resolved', 'closed'])->default('pending');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');
            $table->text('admin_response')->nullable();
            $table->date('resolution_date')->nullable();
            $table->text('internal_remarks')->nullable();

            // Soft deletes and Timestamps
            $table->softDeletes();
            $table->timestamps(); // created_at acts as Submitted Date/Time
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('concerns');
    }
};
