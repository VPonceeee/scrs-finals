import React, { useState } from 'react';
import http from '../../../http';
import rf from '../../../img/rf1.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ReservationInvoice({ 
    handleBackClick,
    GuestInfo,
    startDate, 
    endDate,
    selectedEvent,
    SelectedServices,
    SelectedServicesPrices,
    foodRequests

}) {

    const { KidsQty, AdultsQty, SeniorsQty} = GuestInfo;
    const EntranceFee = 200;
    const totalGuests = parseInt(KidsQty) + parseInt(AdultsQty) + parseInt(SeniorsQty);
    const KidsEF = parseInt(KidsQty) * EntranceFee;
    const AdultsEF = parseInt(AdultsQty) * EntranceFee;
    const SeniorsEF = parseInt(SeniorsQty) * EntranceFee;
    const SubtotalEF = parseInt(KidsEF) + parseInt(AdultsEF) + parseInt(SeniorsEF);
    const Event = selectedEvent === 'Other Events' ? `Other Events/${GuestInfo.OtherEvent}` : selectedEvent;

    const eventPrices = {
        "Birthday": 20000,
        "Wedding": 25000,
        "Family Reunion": 15000,
        "Team Building": 20000,
        "Other Events": 18000
      };
    const eventPrice = eventPrices[selectedEvent] || 18000;
    
    const SubtotalServicePrice = Object.values(SelectedServicesPrices).reduce((acc, curr) => acc + curr, 0);
    const SubtotalEventService = parseInt(eventPrice) + parseInt(SubtotalServicePrice);
    const GetDiscount = 200 * .2
    const KidSeniorDiscount =  parseInt(KidsQty) + parseInt(SeniorsQty);
    const Discount = GetDiscount * KidSeniorDiscount;
    const TotalBill = parseInt(SubtotalEF) + parseInt(SubtotalEventService) - parseInt(Discount);
    const [reservationFee, setReservationFee] = useState('');
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [showAlert, setShowAlert] = useState(false); 
    const navigate = useNavigate(); 

// ====================== UPLOAD IMAGE TO CLOUDINARY CODES START HERE ======================
    const uploadProof = (files)=>{
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "Proof_of_Payment");
        axios.post('https://api.cloudinary.com/v1_1/dfhn1pf9o/image/upload', formData)
        .then((res) => {
            console.log(res.data.url)
            setReservationFee(res.data.url);
            setIsFileSelected(true);
        }).catch((err) => {
            setIsFileSelected(false);
        }); 
    }
// ====================== UPLOAD IMAGE TO CLOUDINARY CODES END HERE ======================

// ====================== ADD RESERVATION TO THE DATABASE CODES START HERE ======================
    const AddReservation = () => {
        const NewReservation = {
            Fullname: `${GuestInfo.FirstName} ${GuestInfo.LastName}`,
            MobileNo: GuestInfo.PhoneNumber,
            Email: GuestInfo.Email,
            StartDate: startDate,
            EndDate: endDate,
            KidsQty: parseInt(KidsQty),
            AdultsQty: parseInt(AdultsQty),
            SeniorsQty: parseInt(SeniorsQty),
            Events: Event,
            Services: SelectedServices.join(', '),
            CateringFoods: foodRequests.join(', '),
            GuestSubtotal: parseInt(SubtotalEF),
            SESubtotal: parseInt(SubtotalEventService),
            Discount: parseInt(Discount),
            Total: parseInt(TotalBill),
            Status: "Pending",
            ReservationFee: reservationFee
        };
    
         //Database connection
         http.post('reservations', NewReservation).then((result) => {
            console.log(result.data);
        }).catch(error => {
            if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else {
                console.error('Error message:', error.message);
            }
        });
        
        console.log(NewReservation);
        // ====================== ALERT CODES START HERE ======================
        setShowAlert(true);  
        setTimeout(() => {
            setShowAlert(false);  
            navigate('/');  
        }, 5000);
        // ====================== ALERT CODES END HERE ======================
    }

// ====================== ADD RESERVATION TO THE DATABASE CODES END HERE ======================



  return (
    <>
        {showAlert && (
            <div className="alert-container">
                <div className="alert alert-success" role="alert">
                    <h5 className="alert-heading">Your reservation has been successfully submitted</h5>
                    <hr/>
                    <p>We will update you via email and phone number regarding to your reservation status. </p>
                    <hr/>
                    <p className="mb-0">Thank you for choosing Su Casa Resort!</p>
                </div>
            </div>
        )}

        <div id='RformMainDiv' className='container'> 
            <div className="container text-center">
                <div className="row">
                    <div className="col"> 
                        <div id='FormTitle' className='container'>
                            <h1>Invoice</h1>
                        </div>
                        <hr></hr>
                        <div className="container text-center">
                            <div className="row">
                                <div className="col">  
                                    <h5 className='GuestInfo'>Fullname: <span className='InvoiceData'>{GuestInfo.FirstName} {GuestInfo.LastName}</span></h5>
                                    <h5 className='GuestInfo'>Mobile Number: <span className='InvoiceData'>{GuestInfo.PhoneNumber}</span></h5>
                                    <h5 className='GuestInfo'>Email: <span className='InvoiceData'>{GuestInfo.Email}</span></h5>
                                </div>

                                <div className="col">
                                    <h5 className='RDate'>Start Date: <span className='InvoiceData'>{startDate}</span></h5>
                                    <h5 className='RDate'>End Date: <span className='InvoiceData'>{endDate}</span></h5>
                                </div>
                            </div>
                        </div>
                        
                        <hr></hr>
                        <h4>Guest Bills</h4>

                        <table class="table ">
                            <thead>
                                <tr>
                                    <th scope="col">Guest</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Entrance Fee</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th >Kids</th>
                                    <td>{KidsQty}</td>
                                    <td>₱{KidsEF}</td>
                                </tr>
                                <tr>
                                    <th>Adults</th>
                                    <td>{AdultsQty}</td>
                                    <td>₱{AdultsEF}</td>
                                </tr>
                                <tr>
                                    <th>Seniors</th>
                                    <td>{SeniorsQty}</td>
                                    <td>₱{SeniorsEF}</td>
                                </tr>
                                <tr>
                                    <th>Subtotal :</th>
                                    <th>{totalGuests}</th>
                                    <th>₱{SubtotalEF}</th>
                                </tr>
                            </tbody>
                            <br></br>
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Desription</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Events</th>
                                    <td>{Event}</td>
                                    <td>₱{eventPrice}</td>
                                </tr>
                                <tr>
                                    <th>Services</th>
                                    <td>            
                                        <ul className="List">
                                            {SelectedServices.map((service, index) => (
                                                <li key={index}>{service}</li>
                                            ))}
                                        </ul>                        
                                    </td>
                                    <td>                             
                                        <ul className="List">
                                            {SelectedServices.map((service, index) => (
                                                <li key={index}>₱{SelectedServicesPrices[service]}</li>
                                            ))}
                                        </ul>   
                                    </td>
                                </tr>                    
                                <tr>
                                    <th>Food Requests</th>
                                    <td>
                                        {foodRequests.map((request, index) => request && 
                                        <ul key={index}>{request}</ul>)}
                                    </td>
                                    <td ></td>
                                </tr>
                                <tr>
                                    <td ></td>
                                    <th className='TotalText'>Subtotal:</th>
                                    <th>₱{SubtotalEventService}</th>
                                </tr>
                                <br></br>
                                <tr>
                                        <td ></td>
                                        <th className='TotalText'>Guest Subotal:</th>
                                        <td>₱{SubtotalEF}</td>
                                    </tr>
                                    <tr >
                                        <td ></td>
                                        <th className='TotalText'>Service & Events Subotal:</th>
                                        <td>₱{SubtotalEventService}</td>
                                    </tr>
                                    <tr >
                                        <td ></td>
                                        <th className='TotalText'>Discount:</th>
                                        <td>₱{Discount}</td>
                                    </tr>
                                    
                                    <tr >
                                        <td ></td>
                                        <th className='TotalText'>Total:</th>
                                        <th>₱{TotalBill}</th>
                                    </tr>  

                            </tbody>
                        </table >
                    </div> 

                    <div className="col"> 
                        <div id='FormTitle' className='container'>
                            <h1>Reservation Fee</h1>
                        </div>
                        <hr></hr>

                        <div id='RFNote' className='container'>
                            <h5>Please note that the reservation fee is ₱500. You can scan the QR code below or send it to the phone number provided to complete your payment. Thank you!</h5>
                        </div>
                        <div className="text-center">
                            <img src={rf} className="rounded" alt="..."/>
                        </div>
                        
                        <div id='FormTitle' className='container'>
                            <h3>0987654321 - Su Casa Resort</h3>
                        </div>

                        <hr></hr>
                        <div className="mb-3">
                            <label for="formFile" className="form-label">Upload your proof of payment</label>
                            <input 
                                className="form-control" 
                                type="file" 
                                id="formFile"  
                                                  
                                onChange={(e)=> uploadProof(e.target.files)}
                            />

                        </div>

                        <div id='RFNote' className='container'>
                            <p><strong>Note:</strong> Strictly no cancellation of reservation once it is reserved. If you cancel it, there will be no refund. A refund will only be issued if your reservation was unsuccessful. The admin will handle the refund process. We will email you once your reservation is successful or unsuccessful.</p>
                        </div>
    

                    </div> 
                </div>

                <div className='row'>
                    <div className='col'>
                        <div id='BackBtnDiv' className="d-grid gap-3 d-md-flex justify-content-md-start">  
                            <button 
                                type="button" 
                                //id="FormsBackBtn" 
                                className="btn btn-danger btn-lg" 
                                onClick={handleBackClick}
                            >
                                ← Back
                            </button>
                        </div>
                    </div>

                    <div className='col'>
                        <div id='BackBtnDiv' className="d-grid gap-3 d-md-flex justify-content-md-end">                        
                            <button 
                                type="button" 
                                className="btn btn-success btn-lg"
                                disabled={!isFileSelected}
                                onClick={() => AddReservation()}                             
                            >                     
                                Submit ➤
                            </button>
                                
                        </div>
                    </div>
                </div>

            </div>
        </div>
        

    </>
  )
}
