<?php

namespace App\Http\Controllers;

use App\Models\CedulaCertificate;
use App\Models\IncidentComplaint;
use App\Models\IncidentForm;
use App\Models\IncidentReport;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $registeredUsers = User::where('user_role', 3)->count();
        $verifiedUsers = User::where('user_role', 3)->where('is_verified', 1)->count();
        $incidentReportCount = IncidentForm::count();
        $incidentComplaintCount = IncidentComplaint::count();
        $cedulaCertificatesCount = CedulaCertificate::count();
        $totalDocuments = $incidentComplaintCount + $cedulaCertificatesCount;
        $roadCounts = DB::table('incident_reports') // Replace 'incidents' with your actual table name
            ->select('road', DB::raw('COUNT(*) as count'))
            ->groupBy('road')
            ->get();
        return view('home');
    }

    public function getAllDashboardData()
    {
        $registeredUsers = User::where('user_role', 3)->count();
        $verifiedUsers = User::where('user_role', 3)->where('is_verified', 1)->count();
        $incidentReportCount = IncidentReport::count();
        $incidentComplaintCount = IncidentComplaint::count();
        $cedulaCertificatesCount = CedulaCertificate::count();
        $totalDocuments = $incidentComplaintCount + $cedulaCertificatesCount;
        $roadCounts = DB::table('incident_reports') // Replace 'incidents' with your actual table name
            ->select('road', DB::raw('COUNT(*) as count'))
            ->groupBy('road')
            ->get();

        return [
            'registeredUsers' => $registeredUsers,
            'verifiedUsers' => $verifiedUsers,
            'incidentReportCount' => $incidentReportCount,
            'incidentComplaintCount' => $incidentComplaintCount,
            'cedulaCertificatesCount' => $cedulaCertificatesCount,
            'totalDocuments' => $totalDocuments,
            'incidentReportGraph' => $roadCounts
        ];
    }

    public function getUserDashboardData(Request $request)
    {
        $incidentReportCount = IncidentReport::where('user_id', $request->user_id)->count();
        $incidentComplaintCount = IncidentForm::where('user_id', $request->user_id)->count();
        $cedulaCertificatesCount = CedulaCertificate::where('user_id', $request->user_id)->count();

        return [
            'incidentReportCount' => $incidentReportCount,
            'incidentComplaintCount' => $incidentComplaintCount,
            'cedulaCertificatesCount' => $cedulaCertificatesCount,
        ];
    }
}
