import React from 'react'
import CheckImg from '../../../img/checkimg.png'
import { Link } from 'react-router-dom'

export default function ReservationMess() {
  return (
    <>
    
    <div id='MessMainDiv' className='container'> 
        <div id='MessContainer' class="alert alert-success" role="alert" >
            <div className="text-center">
                <img src={CheckImg} class="rounded" style={{ maxWidth: '10%', maxHeight: '10%' }} alt="..."/>
            </div>
            <div className='text-center'>
                <h5>Your reservation has been successfully submitted</h5>
                <hr/>
                <p>We will update you via email and phone number regarding to your reservation status. </p>
                <hr/>
                <p className="mb-0">Thank you for choosing Su Casa Resort!</p>
            </div>
            <br></br>
            <div className="text-center">
                <Link to="/">
                    <button class="btn btn-success" type="button">Return to Home</button>
                </Link>
            </div>
            
        </div>
    </div>    
    </>
  )
}
