<?php

namespace App\Models;

use App\Events\ChirpCreated;
use Illuminate\Database\Eloquent\Model;

class Chirp extends Model
{
    protected $fillable = ['message'];

    protected $dispatchesEvents = [
        'created' => ChirpCreated::class,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
