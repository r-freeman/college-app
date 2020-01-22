<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $u = new User();
        $u->name = "Sam Bloggs";
        $u->email = "sam@bloggs.com";
        $u->password = bcrypt("secret");
        $u->save();
    }
}
