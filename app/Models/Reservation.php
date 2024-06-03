<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $table = 'reservation';
    protected $primaryKey = 'ReservationId';
    
    protected $fillable = [
        'Fullname',
        'MobileNo',
        'Email',
        'StartDate',
        'EndDate',
        'KidsQty',
        'AdultsQty',
        'SeniorsQty',
        'Events',
        'Services',
        'CateringFoods',
        'GuestSubtotal',
        'SESubtotal',
        'Discount',
        'Total',
        'Status',
        'ReservationFee'        
    ];
}
