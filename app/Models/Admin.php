<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'new_huwebid',
        'new_huwebpw',
        'name',
        'email',
        'remember_token',
    ];

    protected $hidden = [
        'new_huwebpw',
        'remember_token',
    ];

   
    public function getAuthPassword()
    {
        return $this->new_huwebpw;
    }
}