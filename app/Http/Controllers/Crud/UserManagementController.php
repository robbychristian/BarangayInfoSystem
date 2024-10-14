<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserManagementController extends Controller
{
    public function getAllResidents(Request $request)
    {
        return User::with('profile')->where('user_role', 3)->orWhere('user_role', 2)->get();
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
    public function registerBarangayOfficial(Request $request)
    {
        return User::create([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_role' => 2,
            'is_verified' => 1
        ]);
    }
}
