import React, { useState } from 'react';
import AdminDashboard from '../AdminDasboard/AdminDashboard';
import ReservationRequest from '../ReservationRequest/ReservationRequest';
import AdminCalendar from '../AdminCalendar/AdminCalendar';


export default function Adminpage() {

    /*====Navigation condition code start here====*/
    const [visibleSection, setVisibleSection] = useState('dashboard');

    const handleMenuClick = (section) => {
      setVisibleSection(section);
    };

    /*====Navigation condition code end here====*/

  return (

    <>

      <div className="d-flex">
          <div className="sidebar">
            <nav id="SideBarMenubtn" className="navbar navbar-dark d-lg-none">
              <div className="container-fluid">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#Sidebar"
                  aria-controls="Sidebar"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
            </nav>

            <div id="Sidebar" className="collapse d-lg-block " data-bs-theme="dark">
              <div id="SideBarPanel" className='container-fluid'>
                <h1 className="text-body-emphasis h4">Admin Menu</h1>

                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                      <li className="nav-item">

                          <a id='SideNavName' className="nav-link" href="#" onClick={() => handleMenuClick('dashboard')}>Dashboard</a>

                      </li>

                      <li className="nav-item">

                          <a id='SideNavName' className="nav-link" href="#"onClick={() => handleMenuClick('reservationRequest')}>Reservation Request</a>

                      </li>

                      <li className="nav-item">

                          <a id='SideNavName' className="nav-link" href="#" onClick={() => handleMenuClick('reservationHistory')}>Reservation History</a>

                      </li>


                  </ul>

              </div>
            </div>
          </div>
          {visibleSection === 'dashboard' && (
          <div id='AdminContentsDashboard' className="container">
          
              <AdminDashboard/>
              <AdminCalendar/>
          </div>

          )} {visibleSection === 'reservationRequest' && (
          <div id='ResevationRequest' className='container'>
              <h1>Resevation Request</h1>
              <ReservationRequest/>
          </div>
          )} 
          {visibleSection === 'reservationHistory' && (
          <div id='ResevationHistory' className='container'>
              <h1>Resevation History</h1>
          </div>
            )}
        </div>

    </>

  )
}
