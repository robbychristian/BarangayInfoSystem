<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIncidentFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incident_forms', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string("date_time_incident");
            $table->string("age");
            $table->string("respondent_name");
            $table->string("respondent_address");
            $table->string("respondent_contact_no");
            $table->string("respondent_age");
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
        Schema::dropIfExists('incident_forms');
    }
}
