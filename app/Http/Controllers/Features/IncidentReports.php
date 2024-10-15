<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IncidentReports extends Controller
{
    public function index()
    {
        return view('IncidentReports.IncidentReports');
    }

    public function viewIncidentReport(Request $request)
    {
        return view('IncidentReports.ViewIncidentReport', [
            "id" => $request->id
        ]);
    }
}
