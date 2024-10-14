<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IncidentComplaints extends Controller
{
    public function index()
    {
        return view('IncidentComplaint.IncidentComplaint');
    }

    public function addIncidentComplaints() 
    {
        return view('IncidentComplaint.AddIncidentComplaint');
    }

    public function viewIncidentComplaint(Request $request)
    {
        return view("IncidentComplaint.ViewIncidentComplain", [
            'id' => $request->id,
        ]);
    }
}
