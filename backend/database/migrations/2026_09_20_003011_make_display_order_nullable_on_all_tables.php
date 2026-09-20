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
        $tables = [
            'office_bearers', 'impacts', 'activities', 'downloads', 
            'gallery_images', 'albums', 'statistics', 'articles', 
            'newsletters', 'news_circulars', 'events', 'executive_members'
        ];

        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $tableBlueprint) {
                $tableBlueprint->integer('display_order')->nullable()->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tables = [
            'office_bearers', 'impacts', 'activities', 'downloads', 
            'gallery_images', 'albums', 'statistics', 'articles', 
            'newsletters', 'news_circulars', 'events', 'executive_members'
        ];

        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $tableBlueprint) {
                $tableBlueprint->integer('display_order')->nullable(false)->change();
            });
        }
    }
};
