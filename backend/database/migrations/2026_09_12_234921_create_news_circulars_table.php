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
        Schema::create('news_circulars', function (Blueprint $table) {
            $table->id();

            // News & Circular Fields
            $table->enum('content_type', ['news', 'circular']);
            $table->string('title');
            $table->text('short_description');
            $table->text('full_content');
            $table->string('featured_image')->nullable();
            $table->date('publication_date');
            $table->string('reference_number')->nullable();
            $table->date('circular_date')->nullable();
            $table->string('attachment'); // File URL/path
            $table->string('external_url')->nullable();
            $table->boolean('display_on_homepage')->default(true);
            $table->integer('display_order')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');

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
        Schema::dropIfExists('news_circulars');
    }
};
