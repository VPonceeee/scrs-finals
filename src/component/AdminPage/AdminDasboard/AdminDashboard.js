import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import http from '../../../http';
import { setReservation, setSelectedReservation } from '../../../redux/actions/libraryActions';

export default function AdminDashboard() {
    const reservations = useSelector(state => state.allReservations.reservations);
    const dispatch = useDispatch();

  // ========================== DISPLAY THE DATA FROM THE DATABASE CODES START HERE ==========================
    const displayReservation = () => {
        http.get('reservations')
        .then(result => {
            console.log('API Result:', result.data);
            dispatch(setReservation(result.data.reservation));
        })
        .catch(error => {
            console.log('API Error:', error.message);
        });
    };

    useEffect(() => {
        displayReservation();
    }, []);

    // ========================== DISPLAY THE DATA FROM THE DATABASE CODES END HERE ==========================

  // ========================== UPDATE THE DATA FROM THE DATABASE CODES START HERE ==========================

  const getReservationId = (ReservationId) => {
    console.log('ReservationId:', ReservationId);

    const singleReservation = reservations.find(reservation => reservation.ReservationId === ReservationId);

    if (singleReservation) {
      console.log('Single Reservation before update:', singleReservation);

      singleReservation.Status = "Completed";

      CompleteReservation(singleReservation);
    } else {
      console.error('Reservation not found');
    }
  }

  const CompleteReservation = (updatedReservation) => {
    console.log('Updating Reservation:', updatedReservation);

    http.put(`reservations/${updatedReservation.ReservationId}/update`, updatedReservation)
      .then(result => {
        console.log('Update Result:', result.data);

        dispatch(setSelectedReservation(result.data.reservation));
        displayReservation();
      })
      .catch(error => {
        console.log('Update Error:', error.message);
      });
  };


// ========================== UPDATE THE DATA FROM THE DATABASE CODES END HERE ==========================

    const [modalData, setModalData] = useState(null);

    const handleViewClick = data => {
        setModalData(data);
        const modal = new window.bootstrap.Modal(document.getElementById('viewModal'));
        modal.show();
    };


    return (
        <>
            <div className='container'>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <button class="btn btn-primary" type="button" id="button-addon2"><i class="bi bi-search"></i></button>
            </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Fullname</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Event</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">End Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(reservations) && reservations.length > 0 ? (
                            reservations.filter(reservation => reservation.Status === 'Reserved') .slice(0, 7).map(showReservation => (
                                <tr key={showReservation.ReservationId}>
                                    <td>{showReservation.Fullname}</td>
                                    <td>{showReservation.MobileNo}</td>
                                    <td>{showReservation.Events}</td>
                                    <td>{showReservation.StartDate}</td>
                                    <td>{showReservation.EndDate}</td>
                                    <td>{showReservation.Status}</td>
                                    <td>
                                    <div className='ActionBtn'>
                                        <button
                                        className="btn btn-primary"
                                        onClick={() => handleViewClick(showReservation)}
                                        >
                                        View
                                        </button>
                                        <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => getReservationId(showReservation.ReservationId)}
                                        >
                                        Complete
                                        </button>

                                    </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No reservations available</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="viewModalLabel">View Full Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {modalData && (
                                    <div>
                                        <p><strong>Full Name:</strong> {modalData.Fullname}</p>
                                        <p><strong>Mobile Number:</strong> {modalData.MobileNo}</p>
                                        <p><strong>Email:</strong> {modalData.Email}</p>
                                        <p><strong>Date of Reservation:</strong> {modalData.StartDate} - {modalData.EndDate}</p>
                                        <p><strong>Kids#:</strong> {modalData.KidsQty}</p>
                                        <p><strong>Adults#:</strong> {modalData.AdultsQty}</p>
                                        <p><strong>Seniors#:</strong> {modalData.SeniorsQty}</p>
                                        <p><strong>Event:</strong> {modalData.Events}</p>
                                        <p><strong>Services:</strong> {modalData.Services}</p>
                                        <p><strong>Food Requests:</strong> {modalData.CateringFoods}</p>  
                                        <p><strong>Total Bill:</strong> ₱{modalData.Total}</p>                                     
                                        <p><strong>Status:</strong> {modalData.Status}</p>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
