<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Crud\DocumentSubmissionController;
use App\Http\Controllers\Crud\IncidentComplaints;
use App\Http\Controllers\Crud\UserManagementController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Auth::routes();

Route::post('mobilelogin', [LoginController::class, 'mobileLogin']);


Route::prefix('usermanagement')->group(function() {
    Route::get('getallresidents', [UserManagementController::class, 'getAllResidents']);
    Route::get('getuserdetails', [UserManagementController::class, 'getUserDetails']);
    Route::post('verifyuser', [UserManagementController::class, 'verifyUser']);
    Route::get('checkverification', [LoginController::class, 'checkVerification']);
    Route::post('registerbarangayofficial', [UserManagementController::class, 'registerBarangayOfficial']);
});

Route::prefix('documents')->group(function () {
    Route::get('getallcedulas', [DocumentSubmissionController::class, 'getAllCedulas']);
    Route::get('getcedula', [DocumentSubmissionController::class, 'getCedula']);
    Route::get('getresidentcedulas', [DocumentSubmissionController::class, 'getResidentCedulas']);
    Route::post('submitcedula', [DocumentSubmissionController::class, 'submitCedula']);
    Route::post('approvecedula', [DocumentSubmissionController::class, 'approveData']);

    Route::post('addincidentcomplaint', [IncidentComplaints::class, 'addIncidentComplaint']);
    Route::get('getallincidentreport', [IncidentComplaints::class, 'getAllIncidentReport']);
    Route::get('getresidentincidentreport', [IncidentComplaints::class, 'getResidentIncidentReport']);
    Route::get('getincidentreport', [IncidentComplaints::class, 'getIncidentReport']);
});
