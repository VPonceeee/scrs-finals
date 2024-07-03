import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import http from '../../../http';
import { setReservation, setSelectedReservation } from '../../../redux/actions/libraryActions';
import ReservationApproved from '../ReservationApproved/ReservationApproved';
import AdminCalendar from '../AdminCalendar/AdminCalendar';

export default function AdminDashboard() {


    return (
        <>
            <div classNameName="container">
                
                <AdminCalendar/>
                <br></br>
                <ReservationApproved/>
          </div> 
        </>
    );
}
