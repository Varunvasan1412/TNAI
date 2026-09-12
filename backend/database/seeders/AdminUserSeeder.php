<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@angels.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('admin123'),
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );
    }
}
