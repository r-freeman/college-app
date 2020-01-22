<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    public function enrolments()
    {
        return $this->hasMany('App\Enrolment');
    }
}
