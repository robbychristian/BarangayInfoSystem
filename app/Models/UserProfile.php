<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'contact_number',
        'landline',
        'user_street',
        'user_barangay',
        'user_gender',
        'user_religion',
        'valid_id',
    ];
}
