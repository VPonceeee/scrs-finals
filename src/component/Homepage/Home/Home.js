import React from 'react'
import { Link } from 'react-router-dom'
import SlideImg2 from '../../../img/slide2.png'

export default function Home() {

  return (

    

      <div className='HomePageBanner' style={{ 
        width: '100%', 
        height: '100vh', 
        backgroundImage: `url(${SlideImg2})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }}>
 
        <h1 className='hpTitle'>Welcome to Su Casa Garden Resort</h1>
        <h2 className='hpTagline'>Your dream event starts with us. Reserve now!</h2>
        <br></br>





        <Link to="Reservation">
          <button type="button" id='ReservBtn' className="btn btn-lg" >
            Reserve Now
          </button>
        </Link>


      </div>


  )
}
