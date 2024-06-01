import React, { useState } from 'react';
import http from '../../../http';


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
            Status: "Pending"
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
    
    }

// ====================== ADD RESERVATION TO THE DATABASE CODES END HERE ======================

  return (
    <>
    
        <div id='RformMainDiv' className='container'>
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
                        <th className='TotalText'>Total :</th>
                        <th>{totalGuests}</th>
                        <th>₱{SubtotalEF}</th>
                    </tr>
                </tbody>

                <br></br>
                <h4>Event & Services Bills</h4>

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
            </table>

            <div id='BackBtnDiv' className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button 
                    type="button" 
                    id="FormsBackBtn" 
                    className="btn btn-lg" 
                    onClick={handleBackClick}
                >
                    Back
                </button>
                            
                <button 
                    type="button" 
                    id="FormsNxtBtn" 
                    className="btn btn-lg"
                    onClick={() => AddReservation()} 
                >                     
                    Submit
                </button>
                        
            </div>
        </div>


    </>
  )
}
