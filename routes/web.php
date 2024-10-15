<?php

use App\Http\Controllers\Features\DocumentSubmissionController;
use App\Http\Controllers\Features\IncidentComplaints;
use App\Http\Controllers\Features\IncidentReports;
use App\Http\Controllers\Features\UserManagementController;
use App\Models\IncidentComplaint;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/addcedula', [DocumentSubmissionController::class, 'addcedula']);
Route::get('/cedulacertificates', [DocumentSubmissionController::class, 'index']);
Route::get('/viewcedula', [DocumentSubmissionController::class, 'viewCedula']);
Route::get('/usermanagement', [UserManagementController::class, 'index']);

Route::get('/viewincidentcomplaint', [IncidentComplaints::class, 'viewIncidentComplaint']);
Route::get('/incidentcomplaints', [IncidentComplaints::class, 'index']);
Route::get('/addincidentcomplaint', [IncidentComplaints::class, 'addIncidentComplaints']);

Route::get('/incidentreports', [IncidentReports::class, 'index']);
Route::get('/viewincidentreport', [IncidentReports::class, 'viewIncidentReport']);