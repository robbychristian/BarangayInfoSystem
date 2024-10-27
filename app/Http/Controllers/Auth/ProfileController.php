<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserProfile;
use Google\Cloud\Storage\Connection\Rest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function editProfile(Request $request)
    {
        return view('auth.editprofile', [
            'user_id' => $request->user_id
        ]);
    }

    public function getProfile(Request $request)
    {
        return User::where('id', $request->id)->with('profile')->first();
    }

    public function updateProfile(Request $request)
    {
        User::where('id', $request->id)->update([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'birth_place' => $request->birth_place,
        ]);

        UserProfile::where('user_id', $request->id)->update([
            'contact_number' => $request->profile['contact_number'],
            'landline' => $request->profile['landline'],
            'user_religion' => $request->profile['user_religion'],
        ]);
    }

    public function editPassword(Request $request)
    {
        return view('auth.passwords.changepassword', [
            'user_id' => $request->user_id
        ]);
    }

    public function changePassword(Request $request)
    {
        $user = User::where('id', $request->id)->first();
        if (!Hash::check($request->current_password, $user->password)) {
            return "false";
        } else {
            User::where('id', $request->id)->update([
                'password' => Hash::make($request->new_password)
            ]);
            return "true";
        }
    }
}
