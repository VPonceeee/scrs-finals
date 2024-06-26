import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import http from '../../../http';
import { setReservation, setSelectedReservation, setPendingCount } from '../../../redux/actions/libraryActions';
import emailjs from '@emailjs/browser';

export default function ReservationRequest() {

  //email:emailsystem298@gmail.com
  //pass: @12345678900

  const reservations = useSelector(state => state.allReservations.reservations);
  const dispatch = useDispatch();


// ========================== DISPLAY THE DATA FROM THE DATABASE CODES START HERE ==========================
    const displayReservation = () => {
      http.get('reservations')
        .then(result => {
          console.log('API Result:', result.data);  
          dispatch(setReservation(result.data.reservation));
          const count = countPendingReservations(result.data.reservation);
          dispatch(setPendingCount(count));
        })
        .catch(error => {
          console.log(error.message);
        });
    };
    
    const countPendingReservations = (reservations) => {
      const pendingCount = reservations.filter(reservation => reservation.Status === 'Pending').length;
      console.log('Number of Pending Reservations:', pendingCount);
      return pendingCount;
    };

    useEffect(() => {
      displayReservation();
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl));
    }, []);

// ========================== DISPLAY THE DATA FROM THE DATABASE CODES END HERE ==========================



// ========================== UPDATE THE DATA FROM THE DATABASE CODES START HERE ==========================

    const ConfirmRequest = (ReservationId) => {
      console.log('ReservationId:', ReservationId);

      const GuestConfirmRequest = reservations.find(reservation => reservation.ReservationId === ReservationId);

      if (GuestConfirmRequest) {
        console.log('Single Reservation before update:', GuestConfirmRequest);

        GuestConfirmRequest.Status = "Reserved";
        sendEmail(ConfirmationMess.message, GuestConfirmRequest.Email, GuestConfirmRequest.Fullname);


        ConfirmReservation(GuestConfirmRequest);
      } else {
        console.error('Reservation not found');
      }
    }

    const ConfirmReservation = (updatedReservation) => {
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


    const DeclineRequest = (ReservationId) => {
      console.log('ReservationId:', ReservationId);

      const GuestDeclineRequest = reservations.find(reservation => reservation.ReservationId === ReservationId);

      if (GuestDeclineRequest) {
        console.log('Single Reservation before update:', GuestDeclineRequest);

        GuestDeclineRequest.Status = "Declined";
        sendEmail(DeclinedMess.message, GuestDeclineRequest.Email, GuestDeclineRequest.Fullname);

        DeclineReservation(GuestDeclineRequest);
      } else {
        console.error('Reservation not found');
      }
    }
  
    const DeclineReservation = (updatedReservation) => {
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

// ========================== EMAILJS SEND FUNCTION START HERE ==========================
    const ConfirmationMess = {
      message: 'We are happy to let you know that your reservation at Su Casa Resort is confirmed.\nThank you for choosing us.'
    };

    const DeclinedMess = {
      message: 'We regret to inform you that we cannot confirm your reservation at Su Casa Resort for the requested dates\nWe apologize for any inconvenience this may cause.\nThank you for understanding.\n\n Please note that your reservation fee will be refunded.'
    };

    const sendEmail = (message, toEmail, toName) => {
      const serviceId = 'service_92xrt0k';
      const templateId = 'template_9m739d8';
      const publicKey = 'i9bl4mAwIUXopq1JK';
  
      const templateParams = {
        from_name: 'Su Casa Resort',
        message: message,
        to_email: toEmail,
        to_name: toName,
      };
  
      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then(response => {
          console.log('Email sent successfully', response.status, response.text);
        })
        .catch(error => {
          console.error('Failed to send email', error);
        });
    };
// ========================== EMAILJS SEND FUNCTION END HERE ==========================

// ========================== MODAL CODES START HERE ==========================
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setFullscreenImage(imageSrc);
    const imageModal = new window.bootstrap.Modal(document.getElementById('imageModal'));
    imageModal.show();
  };
  

  const [modalData, setModalData] = useState(null);

  const handleViewClick = (data) => {
    setModalData(data);
    const modal = new window.bootstrap.Modal(document.getElementById('viewModal'));
    modal.show();
  };

// ========================== MODAL CODES END HERE ==========================

// ========================== FILTER AND SEARCH THE DATA FROM THE DATABASE CODES START HERE ==========================

  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredReservations = reservations.filter(reservation =>
    reservation.Status === 'Pending' &&
    (reservation.Fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.MobileNo.includes(searchTerm) ||
      reservation.Events.toLowerCase().includes(searchTerm.toLowerCase()))
  );
// ========================== FILTER AND SEARCH THE DATA FROM THE DATABASE CODES END HERE ==========================


  return (
    <>
      <div className='container'>

        <div className="d-flex justify-content-center mb-3 ">
          <div className='col'>
            <div className="input-group gap-1">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search" 
                aria-label="Search" 
                aria-describedby="button-addon2" 
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="btn btn-primary" type="button" id="button-addon2" >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>

        <table className="table table-striped">
          <thead >
            <tr>

              <th scope="col">Fullname</th>
              <th scope="col">Contact</th>
              <th scope="col">Event</th>
              <th scope="col">Start Date<br/>(YY-MM-DD)</th>
              <th scope="col">End Date<br/>(YY-MM-DD)</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(filteredReservations) && filteredReservations.length > 0 ? (
              filteredReservations.map(showReservation => (
                <tr key={showReservation.ReservationId}>
                  <td>{showReservation.Fullname}</td>
                  <td>{showReservation.Email} <br/>{showReservation.MobileNo}</td>
                  <td>{showReservation.Events}</td>
                  <td>{showReservation.StartDate}</td>
                  <td>{showReservation.EndDate}</td>
                  <td>{showReservation.Status}</td>
                  <td>
                    <div className='ActionBtn'>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleViewClick(showReservation)}
                        data-bs-toggle="tooltip"
                        title="View"
                      >
                         <i class="bi bi-eye"></i>
                      </button>
                      
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => ConfirmRequest(showReservation.ReservationId)}
                        data-bs-toggle="tooltip"
                        title="Accept"
                      >
                        <i class="bi bi-check-circle"></i>
                      </button>
  
                      <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => DeclineRequest(showReservation.ReservationId)}
                        data-bs-toggle="tooltip"
                        title="Decline"
                        >
                          <i class="bi bi-x-circle"></i>
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
                    <p><strong>Proof Of Payment:</strong></p>
                    <img src={modalData.ReservationFee} className="img-fluid" style={{ maxWidth: '100%', maxHeight: '400px' }} onClick={() => handleImageClick(modalData.ReservationFee)}></img>
                    
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="imageModalLabel">Proof Of Payment</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex justify-content-center align-items-center">
              {fullscreenImage && (
                <img src={fullscreenImage} className="img-fluid" style={{ maxWidth: '100%', maxHeight: '100%' }} alt="Proof of Payment"/>
              )}
            </div>
          </div>
        </div>
      </div>

      </div>
    </>
  );
}
