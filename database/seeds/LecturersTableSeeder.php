<?php

use Faker\Factory;
use Illuminate\Database\Seeder;
use App\Lecturer;

class LecturersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for ($i = 0; $i != 50; $i++) {
            $l = new Lecturer();
            $l->name = $faker->name;
            $l->address = $faker->numberBetween(1, 100) . ' ' . $faker->streetName . ', ' . $faker->city;
            $l->phone = $faker->numerify("0##-#######");
            $l->email = $faker->email;
            $l->save();
        }
    }
}
