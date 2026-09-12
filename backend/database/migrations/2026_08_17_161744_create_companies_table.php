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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            
            // General Details
            $table->string('company_name')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('phone_number')->nullable();
            $table->text('company_address')->nullable();
            
            // Branding (Logos & Colors)
            $table->string('main_logo')->nullable();
            $table->string('favicon')->nullable();
            $table->string('primary_color')->default('#319760');
            $table->string('secondary_color')->default('#3498DB');
            
            // SMTP & Email Configuration
            $table->string('smtp_sender_name')->nullable();
            $table->string('smtp_email_address')->nullable();
            $table->string('smtp_password')->nullable();
            
            // Localization & Socials
            $table->string('timezone')->default('Asia/Kolkata');
            $table->string('linkedin_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('facebook_url')->nullable();
            
            // Tracking & Soft Deletes
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
            
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
