<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCedulaCertificatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cedula_certificates', function (Blueprint $table) {
            $table->id();
            $table->string("user_id");
            $table->string("height");
            $table->string("weight");
            $table->string("occupation");
            $table->string("salary");
            $table->string("tin_id");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cedula_certificates');
    }
}
