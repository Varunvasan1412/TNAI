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
        Schema::create('student_details', function (Blueprint $table) {
            $table->id();

            // Core Fields
            $table->string('student_name');
            $table->string('student_id'); // Student ID/Register Number
            $table->string('admission_number')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('gender');
            $table->string('course');
            $table->string('course_year');
            $table->string('academic_year');
            $table->string('batch')->nullable();
            $table->string('student_photo')->nullable();
            $table->string('email');
            $table->string('mobile_number');
            $table->string('parent_guardian_name')->nullable();
            $table->string('parent_guardian_phone')->nullable();
            $table->string('parent_guardian_email')->nullable();
            $table->string('department')->nullable();
            $table->integer('admission_year');
            
            $table->enum('status', ['active', 'inactive'])->default('active'); // Maps to "Student Status"

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
        Schema::dropIfExists('student_details');
    }
};
