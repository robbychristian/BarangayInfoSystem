<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DocumentSubmissionController extends Controller
{
    public function index()
    {
        return view('DocumentSubmissions.CedulaCertificates');
    }

    public function addCedula()
    {
        return view('DocumentSubmissions.AddCedulaCertificate');
    }

    public function viewCedula(Request $request)
    {
        return view('DocumentSubmissions.ViewCedula', [
            'id' => $request->id
        ]);
    }
}
