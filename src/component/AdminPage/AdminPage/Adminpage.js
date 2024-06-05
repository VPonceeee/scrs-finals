import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminDashboard from '../AdminDasboard/AdminDashboard';
import ReservationRequest from '../ReservationRequest/ReservationRequest';
import AdminCalendar from '../AdminCalendar/AdminCalendar';
import ReservationHistory from '../ReservationHistory/ReservationHistory';
import http from '../../../http';
import { setReservation, setPendingCount} from '../../../redux/actions/libraryActions';

export default function Adminpage() {

    /*====Navigation condition code start here====*/
    const [visibleSection, setVisibleSection] = useState('dashboard');

    const handleMenuClick = (section) => {
      setVisibleSection(section);
    };

    /*====Navigation condition code end here====*/
    const pendingCount = useSelector(state => state.allReservations.pendingCount);
    const dispatch = useDispatch();
  

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
    }, []);
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

                          <button 
                            id='SideNavName' 
                            type="button" 
                            class="btn"
                            onClick={() => handleMenuClick('dashboard')}
                          >
                            Dashboard
                          </button>

                      </li>

                      <li className="nav-item">

                          <button 
                            id='SideNavName' 
                            type="button" 
                            class="btn"
                            onClick={() => handleMenuClick('reservationRequest')}
                          >
                            Reservation Request <span className="badge text-bg-danger">{pendingCount}</span>
                          </button>

                      </li>

                      <li className="nav-item">

                          <button 
                            id='SideNavName' 
                            type="button" 
                            class="btn"
                            onClick={() => handleMenuClick('reservationHistory')}
                          >
                            Reservation History
                          </button>

                      </li>


                  </ul>

              </div>
            </div>
          </div>
          {visibleSection === 'dashboard' && (
          <div id='AdminContentsDashboard' className="container">
              <h1>Dashboard</h1>
              <AdminCalendar/>
              <br></br>
              <AdminDashboard/>
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
              <ReservationHistory/>
          </div>
            )}
        </div>

    </>

  )
}
