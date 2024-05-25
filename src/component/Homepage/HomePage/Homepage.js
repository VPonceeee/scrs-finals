import React from 'react'
import Home from '../Home/Home'
import Navbar from '../../Navbar/Navbar'
import Facilities from '../Facilities/Facilities'
import Services from '../Services/Services'

export default function Homepage() {
  return (
    <>
        
        <div id='HomePageMainDiv'>

          <div id='HomeSection'>
              <Home/>
          </div>

          <div id='ServicesSection'>
              <Services/>
          </div>

          <div id='FacilitiesSection'>
              <Facilities/>
          </div>
        </div>      

      {/* <Home/>
      <Services/>
      <Facilities/> */}
    </>
  )
}
