<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncidentComplaint extends Model
{
    use HasFactory;

    protected $fillable = [
        'incident_id',
        'incident_reason',
        'incident_place',
        'incident_time',
        'incident_report',
    ];
}
