<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::all();

        if ($reservations->count() > 0) {
            return response()->json([
                'status' => 200,
                'reservation' => $reservations
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'Message' => 'No Reservation Found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Fullname' => 'required|string|max:255',
            'MobileNo' => 'required|string|max:20',
            'Email' => 'required|email|max:255',
            'StartDate' => 'required|date',
            'EndDate' => 'required|date|after_or_equal:StartDate',
            'KidsQty' => 'required|integer|min:0',
            'AdultsQty' => 'required|integer|min:0',
            'SeniorsQty' => 'required|integer|min:0',
            'Events' => 'required|string|max:255',
            'Services' => 'required|string|max:255',
            'CateringFoods' => 'required|string|max:255',
            'GuestSubtotal' => 'required|integer|min:0',
            'SESubtotal' => 'required|integer|min:0',
            'Discount' => 'required|integer|min:0',
            'Total' => 'required|integer|min:0',
            'Status' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {

            $startDate = date('Y-m-d', strtotime($request->StartDate));
            $endDate = date('Y-m-d', strtotime($request->EndDate));

            $reservation = Reservation::create([
                'Fullname' => $request->Fullname,
                'MobileNo' => $request->MobileNo,
                'Email' => $request->Email,
                'StartDate' => $request->StartDate,
                'EndDate' => $request->EndDate,
                'KidsQty' => $request->KidsQty,
                'AdultsQty' => $request->AdultsQty,
                'SeniorsQty' => $request->SeniorsQty,
                'Events' => $request->Events,
                'Services' => $request->Services,
                'CateringFoods' => $request->CateringFoods,
                'GuestSubtotal' => $request->GuestSubtotal,
                'SESubtotal' => $request->SESubtotal,
                'Discount' => $request->Discount,
                'Total' => $request->Total,
                'Status' => $request->Status
            ]);

            if ($reservation) {
                return response()->json([
                    'status' => 200,
                    'message' => "Reservation Successful"
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => "Reservation Unsuccessful"
                ], 500);
            }
        }
    }

    public function show($reservationId)
    {
        $reservation = Reservation::find($reservationId);
        
        if($reservation)
        {
            return response()->json([
                'status' => 200,
                'reservation' => $reservation
            ], 200);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'Message' => 'No Reservation Found'
            ], 404);  
        }


    }

    public function edit($reservationId)
    {
        $reservation = Reservation::find($reservationId);
        
        if($reservation)
        {
            return response()->json([
                'status' => 200,
                'reservation' => $reservation
            ], 200);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'Message' => 'No Reservation Found'
            ], 404);  
        }


    }

    public function update(Request $request, int $reservationId)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'Fullname' => 'required|string|max:255',
            'MobileNo' => 'required|string|max:20',
            'Email' => 'required|email|max:255',
            'StartDate' => 'required|date',
            'EndDate' => 'required|date|after_or_equal:StartDate',
            'KidsQty' => 'required|integer|min:0',
            'AdultsQty' => 'required|integer|min:0',
            'SeniorsQty' => 'required|integer|min:0',
            'Events' => 'required|string|max:255',
            'Services' => 'required|string|max:255',
            'CateringFoods' => 'required|string|max:255',
            'GuestSubtotal' => 'required|integer|min:0',
            'SESubtotal' => 'required|integer|min:0',
            'Discount' => 'required|integer|min:0',
            'Total' => 'required|integer|min:0',
            'Status' => 'required|string|max:255',
        ]);

        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }

        // Retrieve the reservation by ID
        $reservation = Reservation::find($reservationId);

        // Check if the reservation exists
        if (!$reservation) {
            return response()->json([
                'status' => 404,
                'message' => 'No Reservation Found'
            ], 404);
        }

        // Update the reservation details
        $reservation->update([
            'Fullname' => $request->Fullname,
            'MobileNo' => $request->MobileNo,
            'Email' => $request->Email,
            'StartDate' => $request->StartDate,
            'EndDate' => $request->EndDate,
            'KidsQty' => $request->KidsQty,
            'AdultsQty' => $request->AdultsQty,
            'SeniorsQty' => $request->SeniorsQty,
            'Events' => $request->Events,
            'Services' => $request->Services,
            'CateringFoods' => $request->CateringFoods,
            'GuestSubtotal' => $request->GuestSubtotal,
            'SESubtotal' => $request->SESubtotal,
            'Discount' => $request->Discount,
            'Total' => $request->Total,
            'Status' => $request->Status
        ]);

        // Return a successful response
        return response()->json([
            'status' => 200,
            'message' => 'Reservation Update Successful'
        ], 200);
    }


    public function remove($reservationId)
    {
        $reservation = Reservation::find($reservationId);
        if($reservation)
        {
            $reservation->delete();
            return response()->json([
                'status' => 200,
                'Message' => "Reservation Deleted Successfully"
            ], 200);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'Message' => 'No Reservation Found'
            ], 404); 
        }
    }


}
