import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import SmoothScroll from 'smooth-scroll'

export default function Navbar() {

    const location = useLocation();

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        if (location.pathname !== '/') {
          window.location.href = `/#${targetId}`;
        } else {
          const scroll = new SmoothScroll();
          const anchor = document.querySelector(`#${targetId}`);
          scroll.animateScroll(anchor);
        }
      };

  return (
    <>

        <nav className="navbar navbar-expand-lg sticky-top">

            <div className="container-fluid">

            <Link id='LinkNav' to="/" onClick={(e) => handleScroll(e, 'HomeSection')}>
                <a id='NavName' className="nav-link">Su Casa Resort</a>
            </Link>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">

                <span className="navbar-toggler-icon"></span>

            </button>

            <div className="collapse navbar-collapse ms-5 " id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    <li className="nav-item">

                        <Link id='LinkNav' to="/" onClick={(e) => handleScroll(e, 'HomeSection')}>
                            <span id='NavName' className="nav-link">Home</span>
                        </Link>

                    </li>

                    <li className="nav-item">

                        <Link id='LinkNav' to="/" onClick={(e) => handleScroll(e, 'ServicesSection')}>
                            <span id='NavName' className="nav-link">Services</span>
                        </Link>

                    </li>

                    <li className="nav-item">

                        <Link id='LinkNav' to="/" onClick={(e) => handleScroll(e, 'FacilitiesSection')}>
                            <span id='NavName' className="nav-link">Facilities</span>
                        </Link>

                    </li>

                    <li className="nav-item">

                        <Link id='LinkNav' to="/" onClick={(e) => handleScroll(e, 'ContactSection')}>
                            <span id='NavName' className="nav-link">Contact</span>
                        </Link>
                        
                    </li>

                </ul>

            </div>

        </div>

        </nav>
        




    
    </>
  )
}
