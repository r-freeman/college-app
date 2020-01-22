<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Enrolment extends Model
{
    public function course()
    {
        return $this->belongsTo('App\Course');
    }

    public function lecturer()
    {
        return $this->belongsTo('App\Lecturer');
    }
}
