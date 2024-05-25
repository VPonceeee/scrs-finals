// Invoice.js
import React from 'react';


export default function Invoice({ formData, startDate, endDate, selectedEvent, selectedServices, selectedServicesPrices, foodRequests }) {
    const { kids, adults, seniors} = formData;

    const EntranceFee = 200;

    const totalGuests = parseInt(kids) + parseInt(adults) + parseInt(seniors);
    const KidsEF = parseInt(kids) * EntranceFee;
    const AdultsEF = parseInt(adults) * EntranceFee;
    const SeniorsEF = parseInt(seniors) * EntranceFee;
    const SubtotalEF = parseInt(KidsEF) + parseInt(AdultsEF) + parseInt(SeniorsEF);
    // const ServicePrice = Object.values(selectedServicesPrices).reduce((acc, curr) => acc + curr, 0);
    const SubtotalServicePrice = Object.values(selectedServicesPrices).reduce((acc, curr) => acc + curr, 0);


    const eventPrices = {
        "Birthday": 20000,
        "Wedding": 25000,
        "Family Reunion": 15000,
        "Team Building": 20000,
        "Other Events": 18000
      };
    
    const eventPrice = eventPrices[selectedEvent] || 18000;
    
    const SubtotalEventService = parseInt(eventPrice) + parseInt(SubtotalServicePrice);

    const GetDiscount = 200 * .2
    const KidSeniorDiscount =  parseInt(kids) + parseInt(seniors);
    const Discount = GetDiscount * KidSeniorDiscount;

    const TotalBill = parseInt(SubtotalEF) + parseInt(SubtotalEventService) - parseInt(Discount);
  return (
    <>
      <div id='InvoiceMainDiv' className='container'>

        <hr></hr>

        <div className="container text-center">

          <div className="row">

            <div className="col">
                
                <h5 className='GuestInfo'>Fullname: <span className='InvoiceData'>{formData.firstName} {formData.lastName}</span></h5>
                <h5 className='GuestInfo'>Mobile Number: <span className='InvoiceData'>{formData.mobileNumber}</span></h5>
                <h5 className='GuestInfo'>Email: <span className='InvoiceData'>{formData.email}</span></h5>
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
                    <td>{kids}</td>
  
                    <td>₱{KidsEF}</td>
                </tr>
                <tr>
                    <th>Adults</th>
                    <td>{adults}</td>

                    <td>₱{AdultsEF}</td>
                </tr>
                <tr>
                    <th>Seniors</th>
                    <td>{seniors}</td>

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
                    <td>{selectedEvent}</td>
                    <td>₱{eventPrice}</td>
                </tr>
    
                <tr>
                    <th>Services</th>
                    <td>            
                        <ul className="List">
                            {selectedServices.map((service, index) => (
                                <li key={index}>{service}</li>
                            ))}
                        </ul>                        
                    </td>
                    <td>                             
                        <ul className="List">
                            {selectedServices.map((service, index) => (
                                <li key={index}>₱{selectedServicesPrices[service]}</li>
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
        
      </div>
    </>
  );
}
