<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Mockery\Undefined;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    // protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function register(Request $request)
    {
        $this->validator($request->all())->validate();

        $this->create($request->all());
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'birthday' => ['required', 'string', 'max:255'],
            'birth_place' => ['required', 'string', 'max:255'],
            'is_employed' => ['required'],
            'is_student' => ['required'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        if (request()->hasFile('valid_id')) {
            $user = User::create([
                'first_name' => $data['first_name'],
                'middle_name' => $data['middle_name'],
                'last_name' => $data['last_name'],
                'birthday' => $data['birthday'],
                'birth_place' => $data['birth_place'],
                'is_employed' => $data['is_employed'], // should be passed as boolean
                'is_student' => $data['is_student'],
                'school_name' => isset($data['school_name']) ? $data['school_name'] : "",
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'user_role' => 3,
                'is_verified' => false,
            ]);

            $file = request()->file('valid_id');
            $fileName = $file->getClientOriginalName();

            $file->move(public_path('image/uploaded_ids/' . $user->id), $fileName);

            UserProfile::create([
                'user_id' => $user->id,
                'contact_number' => $data['contact_no'],
                'landline' => $data['landline'],
                'user_street' => $data['user_street'],
                'user_barangay' => $data['user_barangay'],
                'user_gender' => $data['gender'],
                'user_religion' => $data['religion'],
                'valid_id' => $fileName,
            ]);

            return $user;
        }

    }
}
