<?php

use Faker\Factory;
use Illuminate\Database\Seeder;
use App\Course;
use App\Lecturer;
use App\Enrolment;

class EnrolmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $courses = Course::all();
        $lecturers = Lecturer::all();
        $statusArray = ['interested', 'assigned', 'associate', 'career_break'];
        $faker = Factory::create();
        for ($i = 0; $i != 200; $i++) {
          $c = $courses->random();
          $l = $lecturers->random();

          $dateTime = $faker->dateTimeBetween('-3 months', 'now');

          $e = new Enrolment();
          $e->course_id = $c->id;
          $e->lecturer_id = $l->id;
          $e->date = $dateTime->format('Y-m-d');
          $e->time = $dateTime->format('H:i');
          $e->status = $statusArray[array_rand($statusArray)];
          $e->save();
        }
    }
}
