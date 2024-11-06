<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\CedulaCertificate;
use App\Models\IncidentComplaint;
use Illuminate\Http\Request;

class DocumentSubmissionController extends Controller
{
    public function getAllCedulas(Request $request)
    {
        return CedulaCertificate::with(['user' => function($query) use ($request) {
            $query->get();
        }])->get();
    }

    public function getResidentCedulas(Request $request)
    {
        return CedulaCertificate::with('user')->where('user_id', $request->user_id)->get();
    }

    public function getCedula(Request $request)
    {
        return CedulaCertificate::with(['user' => function ($query) use ($request) {
            $query->with('profile');
        }])->where('id', $request->id)->first();
    }

    public function submitCedula(Request $request)
    {
        return CedulaCertificate::create([
            'user_id' => $request->user_id,
            'height' => $request->height,
            'weight' => $request->weight,
            'occupation' => $request->occupation,
            'salary' => $request->salary,
            'tin_id' => $request->tin_id,
            'cedula_status' => "Pending"
        ]);
    }

    public function approveData(Request $request)
    {
        return CedulaCertificate::where('id', $request->id)->update([
            'cedula_status' => 'Approved'
        ]);
    }

    public function updateCertificate(Request $request)
    {
        if ($request->data['cedula_status'] == "Pending") {
            CedulaCertificate::where('id', $request->data['id'])->update([
                'cedula_status' => 'In Progress',
            ]);
        } else if ($request->data['cedula_status'] == "In Progress") {
            CedulaCertificate::where('id', $request->data['id'])->update([
                'cedula_status' => 'Completed',
            ]);
        }
    }
}
