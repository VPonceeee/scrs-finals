<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('reservations', [ReservationController::class, 'index']);
Route::post('reservations', [ReservationController::class, 'store']);
Route::get('reservations/{reservationId}', [ReservationController::class, 'show']);
Route::get('reservations/{reservationId}/edit', [ReservationController::class, 'edit']);
Route::put('reservations/{reservationId}/update', [ReservationController::class, 'update']);
Route::delete('reservations/{reservationId}/delete', [ReservationController::class, 'remove']);