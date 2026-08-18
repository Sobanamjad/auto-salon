<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // ✅ Admin User
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        // ✅ Normal Users
        User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password123'),
            'role' => 'user',
        ]);

        User::create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'password' => Hash::make('password123'),
            'role' => 'user',
        ]);

        // ✅ Ya multiple users loop mein:
        // $users = [
        //     ['name' => 'Mike Johnson', 'email' => 'mike@example.com'],
        //     ['name' => 'Sarah Wilson', 'email' => 'sarah@example.com'],
        // ];
        
        // foreach ($users as $userData) {
        //     User::create([
        //         'name' => $userData['name'],
        //         'email' => $userData['email'],
        //         'password' => Hash::make('password123'),
        //         'role' => 'user',
        //     ]);
        // }
    }
}