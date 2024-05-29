import React from 'react'

export default function ReservationInvoice({ handleBackClick }) {
  return (
    <>

        {/* <div id='RformMainDiv' className='container'>
            <div id='FormTitle' className='container'>
                <h1>Invoice</h1>
            </div>
        </div> */}
        
        <div id='RformMainDiv' className='container'>
            <div id='FormTitle' className='container'>
                <h1>Invoice</h1>
            </div>
            <hr></hr>

            <div className="container text-center">
                <div className="row">
                    <div className="col">  
                        <h5 className='GuestInfo'>Fullname:</h5>
                        <h5 className='GuestInfo'>Mobile Number:</h5>
                        <h5 className='GuestInfo'>Email:</h5>
                    </div>

                    <div className="col">
                        <h5 className='RDate'>Start Date:</h5>
                        <h5 className='RDate'>End Date:</h5>
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
                        <td></td>
                        <td>₱</td>
                    </tr>
                    <tr>
                        <th>Adults</th>
                        <td></td>
                        <td>₱</td>
                    </tr>
                    <tr>
                        <th>Seniors</th>
                        <td></td>
                        <td>₱</td>
                    </tr>
                    <tr>
                        <th className='TotalText'>Total :</th>
                        <th></th>
                        <th>₱</th>
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
                        <td></td>
                        <td>₱</td>
                    </tr>
                    <tr>
                        <th>Services</th>
                        <td>            
                            <ul className="List">
                                {/* {selectedServices.map((service, index) => (
                                    <li key={index}>{service}</li>
                                ))} */}
                            </ul>                        
                        </td>
                        <td>                             
                            <ul className="List">
                                {/* {selectedServices.map((service, index) => (
                                    <li key={index}>₱{selectedServicesPrices[service]}</li>
                                ))} */}
                            </ul>   
                        </td>
                    </tr>                    
                    <tr>
                        <th>Food Requests</th>
                        <td>
                            {/* {foodRequests.map((request, index) => request && 
                            <ul key={index}>{request}</ul>)} */}
                        </td>
                        <td ></td>
                    </tr>
                    <tr>
                        <td ></td>
                        <th className='TotalText'>Subtotal:</th>
                        <th>₱</th>
                    </tr>
                    <br></br>
                    <tr>
                            <td ></td>
                            <th className='TotalText'>Guest Subotal:</th>
                            <td>₱</td>
                        </tr>
                        <tr >
                            <td ></td>
                            <th className='TotalText'>Service & Events Subotal:</th>
                            <td>₱</td>
                        </tr>
                        <tr >
                            <td ></td>
                            <th className='TotalText'>Discount:</th>
                            <td>₱</td>
                        </tr>
                        
                        <tr >
                            <td ></td>
                            <th className='TotalText'>Total:</th>
                            <th>₱</th>
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
                >                     
                    Submit
                </button>
                        
            </div>
        </div>

    </>

  )
}
