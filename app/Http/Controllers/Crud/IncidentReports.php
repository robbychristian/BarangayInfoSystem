<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\IncidentReport;
use Illuminate\Http\Request;

class IncidentReports extends Controller
{
    public function getAllIncidentReport(Request $request)
    {
        return IncidentReport::with('user')->get();
    }
    public function getResidentIncidentReport(Request $request)
    {
        return IncidentReport::where('user_id', $request->user_id)->with("user")->get();
    }

    public function getIncidentReport(Request $request)
    {
        return IncidentReport::where('id', $request->id)->with('user')->first();
    }

    public function addIncidentReport(Request $request)
    {
        IncidentReport::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'message' => $request->message,
            'lon' => $request->lon,
            'lat' => $request->lat,
            'status' => "Pending",
        ]);
    }
}
