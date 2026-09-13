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
        Schema::create('office_bearers', function (Blueprint $table) {
            $table->id();

            // Core Fields
            $table->json('bearer_names'); // (Multiple) Text
            $table->string('student_id');
            $table->string('designation');
            $table->string('academic_year');
            $table->string('course')->nullable();
            $table->string('year_of_study')->nullable();
            $table->string('photo');
            $table->string('mobile_number')->nullable();
            $table->string('email')->nullable();
            $table->date('from_date')->nullable();
            $table->date('to_date')->nullable();
            $table->integer('display_order')->default(0);
            
            $table->enum('status', ['active', 'inactive'])->default('active');

            // Standard Maker-Checker Workflow Fields
            $table->enum('approval_status', ['draft', 'pending', 'approved', 'rejected', 'rework'])->default('draft');
            $table->foreignId('submitted_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('submitted_date')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('reviewed_date')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->text('admin_remarks')->nullable();
            $table->timestamp('published_date')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('office_bearers');
    }
};
