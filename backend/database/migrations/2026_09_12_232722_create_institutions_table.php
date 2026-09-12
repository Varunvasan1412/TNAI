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
        Schema::create('institutions', function (Blueprint $table) {
            $table->id();

            // Institution Fields
            $table->string('institution_name');
            $table->string('institution_code')->unique();
            $table->string('institution_type');
            $table->string('affiliation');
            $table->string('recognized');
            $table->string('accreditation');
            $table->integer('established_year');
            $table->string('principal_name');
            $table->string('tnai_unit');
            $table->string('sna_unit');
            $table->text('address');
            $table->string('city');
            $table->string('district');
            $table->string('state');
            $table->string('pincode');
            $table->string('phone')->nullable();
            $table->string('email')->unique();
            $table->string('website');
            $table->string('institution_logo'); // URL/path
            $table->string('institution_image')->nullable(); // URL/path
            $table->text('description')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->foreignId('college_user_id')->nullable()->constrained('users')->onDelete('set null');

            // Approval Workflow Fields
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
        Schema::dropIfExists('institutions');
    }
};
