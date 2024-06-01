import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import http from '../../../http';
import { setReservation, setSelectedReservation } from '../../../redux/actions/libraryActions';

export default function ReservationHistory() {

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

    

    const [modalData, setModalData] = useState(null);

    const handleViewClick = (data) => {
      setModalData(data);
      const modal = new window.bootstrap.Modal(document.getElementById('viewModal'));
      modal.show();
    };

  return (
    <>
    
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Fullname</th>
                <th scope="col">Contact</th>
                <th scope="col">Event</th>
                <th scope="col">Date of Reservation</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
            </tr>
            </thead>

            <tbody>
            {Array.isArray(reservations) && reservations.length > 0 ? (
                reservations.filter(reservation => reservation.Status === 'Declined' || reservation.Status ==='Done').map(showReservation => (
                <tr key={showReservation.ReservationId}>
                    <td>{showReservation.ReservationId}</td>
                    <td>{showReservation.Fullname}</td>
                    <td>{showReservation.MobileNo}</td>
                    <td>{showReservation.Events}</td>
                    <td>{showReservation.StartDate} - {showReservation.EndDate}</td>
                    <td>{showReservation.Status}</td>
                    <td>
                    <div className='ActionBtn'>
                        <button
                        className="btn btn-primary"
                        onClick={() => handleViewClick(showReservation)}
                        >
                        View
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
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
        </div> 

    </>
  )
}
