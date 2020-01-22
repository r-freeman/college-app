<?php

use Faker\Factory;
use Illuminate\Database\Seeder;
use App\Course;

class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        $titles = [
            'Cloud computing',
            'Interaction design',
            'Mobile computing',
            'Web design',
            'Data analytics and big data',
            'Digital media',
            'Business information systems',
            'Computer vision',
            'Distributed computing',
            'Computer security and forensics',
            'Computer architecture',
            'Database systems',
            'Computer networks',
            'Artifical intelligence',
            'Image processing',
            'Machine learning',
            'Computer graphics',
            'Operating systems',
            'Software testing',
            'Robotics and automation'
        ];
        foreach ($titles as $title) {
            $c = new Course();
            $c->title = $title;
            $c->code = strtoupper($faker->bothify('??###'));
            $c->description = $faker->realText(200);
            $c->points = $faker->numberBetween(100, 600);
            $c->level = $faker->numberBetween(7, 10);
            $c->save();
        }

    }
}
