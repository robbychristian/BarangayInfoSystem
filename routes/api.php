<?php

use App\Http\Controllers\Crud\DocumentSubmissionController;
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

Route::prefix('usermanagement')->group(function() {
    Route::get('getallresidents', [UserManagementController::class, 'getAllResidents']);
    Route::get('getuserdetails', [UserManagementController::class, 'getUserDetails']);
    Route::post('verifyuser', [UserManagementController::class, 'verifyUser']);
});

Route::prefix('documents')->group(function () {
    Route::get('getallcedulas', [DocumentSubmissionController::class, 'getAllCedulas']);
    Route::get('getresidentcedulas', [DocumentSubmissionController::class, 'getResidentCedulas']);
    Route::post('submitcedula', [DocumentSubmissionController::class, 'submitCedula']);
});
