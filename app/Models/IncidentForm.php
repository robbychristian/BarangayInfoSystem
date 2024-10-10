<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncidentForm extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date_time_incident',
        'age',
        'respondent_name',
        'respondent_address',
        'respondent_contact_no',
        'respondent_age',
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
