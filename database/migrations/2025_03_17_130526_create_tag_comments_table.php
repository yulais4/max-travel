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
        Schema::create('tag_comments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedInteger     ('tag_id');
            $table->string              ('username');
            $table->text                ('body');
            $table->unsignedSmallInteger('likes')->default(0);
            $table->unsignedSmallInteger('dislikes')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tag_comments');
    }
};
