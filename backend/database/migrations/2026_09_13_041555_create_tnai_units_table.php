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
        Schema::create('tnai_units', function (Blueprint $table) {
            $table->id();

            // Core Fields
            $table->string('unit_name');
            $table->string('unit_code');
            $table->string('branch_zone');
            $table->string('unit_head_secretary');
            $table->string('contact_person');
            $table->string('phone');
            $table->string('email');
            $table->text('address');
            $table->string('district');
            $table->string('state');
            $table->integer('number_of_members');
            $table->longText('description')->nullable();
            $table->string('image')->nullable();
            
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
        Schema::dropIfExists('tnai_units');
    }
};
