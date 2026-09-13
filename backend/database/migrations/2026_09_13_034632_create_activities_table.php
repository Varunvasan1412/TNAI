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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();

            // Core Fields
            $table->string('title');
            $table->string('category');
            $table->text('short_description');
            $table->longText('detailed_description');
            $table->date('activity_date');
            $table->string('location')->nullable();
            $table->string('featured_image'); // required
            $table->json('gallery_images')->nullable();
            $table->string('supporting_document')->nullable();
            $table->integer('display_order')->default(0);
            
            // Status field maps to Active/Inactive in frontend, but in DB we enforce lowercase
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
        Schema::dropIfExists('activities');
    }
};
