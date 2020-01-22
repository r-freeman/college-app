<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lecturer extends Model
{
    public function enrolments()
    {
        return $this->hasMany('App\Enrolment');
    }
}
