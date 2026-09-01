<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;

/**
 * @property int $id
 * @property string $name
 * @property string|null $nickname
 * @property string $email
 * @property string|null $email2
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $phone1
 * @property string|null $phone2
 * @property string|null $address
 * @property string|null $website
 * @property string|null $working_hours
 * @property string|null $slogan
 * @property string|null $brief
 * @property string|null $description
 * @property string|null $bank_account
 * @property string|null $remark
 * @property string|null $position
 * @property string|null $company_name
 * @property string|null $vat_number
 * @property string|null $fax
 * @property string|null $line_id
 * @property string|null $line_url
 * @property int $line_message_status
 * @property string|null $line_channel_id
 * @property string|null $line_access_token
 * @property string|null $line_secret
 * @property string|null $line_user_id
 * @property string|null $wechat
 * @property string|null $skype
 * @property string|null $facebook
 * @property string|null $instagram
 * @property string|null $twitter
 * @property string|null $weibo
 * @property int $is_published
 * @property int $e_name_card
 * @property int $is_meet
 * @property string|null $ad_content
 * @property string|null $ad_url
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property Carbon|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property string|null $role  
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'name', 
    'nickname',
    'email', 
    'email2',
    'password', 
    'role',
    'phone1',
    'phone2',
    'address',
    'website',
    'working_hours',
    'slogan',
    'brief',
    'description',
    'bank_account',
    'remark',
    'position',
    'company_name',
    'vat_number',
    'fax',
    'line_id',
    'line_url',
    'line_message_status',
    'line_channel_id',
    'line_access_token',
    'line_secret',
    'line_user_id',
    'wechat',
    'skype',
    'facebook',
    'instagram',
    'twitter',
    'weibo',
    'is_published',
    'e_name_card',
    'is_meet',
    'ad_content',
    'ad_url',
])]  
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable implements PasskeyUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, PasskeyAuthenticatable, TwoFactorAuthenticatable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => 'string',
            'is_published' => 'integer',
            'e_name_card' => 'integer',
            'is_meet' => 'integer',
            'line_message_status' => 'integer',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    // Helper methods for role checking
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isUser(): bool
    {
        return $this->role === 'user' || $this->role === null;
    }

    // Check if user has specific role
    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    // Get full name
    public function getFullNameAttribute(): string
    {
        return $this->name . ($this->nickname ? " ({$this->nickname})" : '');
    }

    // Get display name
    public function getDisplayNameAttribute(): string
    {
        return $this->nickname ?? $this->name;
    }
}