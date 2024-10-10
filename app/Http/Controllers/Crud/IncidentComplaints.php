<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\IncidentComplaint;
use App\Models\IncidentForm;
use Carbon\Carbon;
use Illuminate\Http\Request;

class IncidentComplaints extends Controller
{
    public function addIncidentComplaint(Request $request)
    {
        $incident = IncidentForm::create([
            'user_id' => $request->user_id,
            'date_time_incident' => $request->date_time_incident,
            'age' => $request->age,
            'respondent_name' => $request->respondent_name,
            'respondent_address' => $request->respondent_address,
            'respondent_contact_no' => $request->respondent_contact_no,
            'respondent_age' => $request->respondent_age,
        ]);

        IncidentComplaint::create([
            'incident_id' => $incident->id,
            'incident_reason' => $request->incident_reason,
            'incident_place' => $request->incident_place,
            'incident_time' => $request->incident_time,
            'incident_report' => $request->incident_report,
        ]);
    }

    public function getAllIncidentReport(Request $request)
    {
        return IncidentForm::with('user')->get();
    }
}
