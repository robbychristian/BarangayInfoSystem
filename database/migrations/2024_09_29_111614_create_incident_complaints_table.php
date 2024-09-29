<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIncidentComplaintsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incident_complaints', function (Blueprint $table) {
            $table->id();
            $table->string('incident_id');
            $table->string('incident_reason');
            $table->string('incident_place');
            $table->string('incident_time');
            $table->string('incident_report', 1000);
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
        Schema::dropIfExists('incident_complaints');
    }
}
