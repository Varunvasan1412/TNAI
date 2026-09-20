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
        Schema::table('statistics', function (Blueprint $table) { $table->longText('icon')->nullable()->change(); });
        Schema::table('newsletters', function (Blueprint $table) { $table->longText('cover_image')->nullable()->change(); $table->longText('newsletter_pdf')->nullable()->change(); });
        Schema::table('news_circulars', function (Blueprint $table) { $table->longText('featured_image')->nullable()->change(); $table->longText('attachment')->nullable()->change(); });
        Schema::table('institutions', function (Blueprint $table) { $table->longText('institution_logo')->nullable()->change(); });
        Schema::table('gallery_images', function (Blueprint $table) { $table->longText('image')->nullable()->change(); });
        Schema::table('events', function (Blueprint $table) { $table->longText('event_banner')->nullable()->change(); $table->longText('event_brochure')->nullable()->change(); });
        Schema::table('downloads', function (Blueprint $table) { $table->longText('file_path')->nullable()->change(); });
        Schema::table('concerns', function (Blueprint $table) { $table->longText('attachment')->nullable()->change(); });
        Schema::table('articles', function (Blueprint $table) { $table->longText('featured_image')->nullable()->change(); $table->longText('attachment')->nullable()->change(); });
        Schema::table('albums', function (Blueprint $table) { $table->longText('cover_image')->nullable()->change(); });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('statistics', function (Blueprint $table) { $table->string('icon', 255)->nullable()->change(); });
        Schema::table('newsletters', function (Blueprint $table) { $table->string('cover_image', 255)->nullable()->change(); $table->string('newsletter_pdf', 255)->nullable()->change(); });
        Schema::table('news_circulars', function (Blueprint $table) { $table->string('featured_image', 255)->nullable()->change(); $table->string('attachment', 255)->nullable()->change(); });
        Schema::table('institutions', function (Blueprint $table) { $table->string('institution_logo', 255)->nullable()->change(); });
        Schema::table('gallery_images', function (Blueprint $table) { $table->string('image', 255)->nullable()->change(); });
        Schema::table('events', function (Blueprint $table) { $table->string('event_banner', 255)->nullable()->change(); $table->string('event_brochure', 255)->nullable()->change(); });
        Schema::table('downloads', function (Blueprint $table) { $table->string('file_path', 255)->nullable()->change(); });
        Schema::table('concerns', function (Blueprint $table) { $table->string('attachment', 255)->nullable()->change(); });
        Schema::table('articles', function (Blueprint $table) { $table->string('featured_image', 255)->nullable()->change(); $table->string('attachment', 255)->nullable()->change(); });
        Schema::table('albums', function (Blueprint $table) { $table->string('cover_image', 255)->nullable()->change(); });
    }
};
