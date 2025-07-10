<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagComment extends Model
{
    use HasFactory;

    protected $table = 'tag_comments';
    protected $connection = 'mysql';
    protected $guarded = false;
}
