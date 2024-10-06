<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    public function getAllResidents(Request $request)
    {
        return User::with('profile')->where('user_role', 3)->get();
    }

    public function getUserDetails(Request $request)
    {
        return User::with('profile')->where('id', $request->id)->first();
    }

    public function verifyUser(Request $request)
    {
        return User::where('id', $request->id)->update([
            'is_verified' => 1,
        ]);
    }
}
