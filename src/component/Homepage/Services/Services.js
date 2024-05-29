import React from 'react';
import { Link } from 'react-router-dom'
import bdayimg from '../../../img/bdayimg.jpg';
import teambimg from '../../../img/teambimg.jpg';
import familyimg from '../../../img/familyimg.jpg'
import weddingimg from '../../../img/weddingimg.png'

export default function Services() {
  return (
    <>
      <div id='ServiceMainDiv' className='container'>
        
        <h1>Our Services</h1>

        <div className='ServieIntro'>
          <p >Welcome to our exceptional event services! We cater to all your special occasions, including birthdays, weddings, family reunions, and team-building events. Our offerings include professional MCs, beautiful decorations, swimming pools, exciting water sports, comfortable rooms, and top-quality catering with customizable menu options. Let us make your event unforgettable with our comprehensive and personalized services. Book with us today and experience the best in event planning!</p>
        </div>

        <div className="row row-cols-1 row-cols-md-4 g-4">
          <div className="col">
            <div id='ServiceCard' className="card">
              <img src={bdayimg} className="card-img-top" alt="Birthday" />
              <div className="card-body">
                <h5 className="card-title">Birthday</h5>
                <p className="card-text">Services included: Clown, Party Decoration, Swimming Pool, Party Games, Rooms and Catering with a maximum of 5 food that you can request.</p>
                <Link to="Reservationpage">
                <a href="#" className="btn btn-primary">Reserve Now</a>
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div id='ServiceCard' className="card">
              <img src={weddingimg} className="card-img-top" alt="Team Building" />
              <div className="card-body">
                <h5 className="card-title">Wedding</h5>
                <p className="card-text">Services included: MC, Wedding decoration, Swimming pool, Water Sports, Rooms, and Catering with a maximum of 5 food that you can request.</p>
                <Link to="Reservationpage">
                <a href="#" className="btn btn-primary">Reserve Now</a>
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div id='ServiceCard' className="card">
              <img src={familyimg} className="card-img-top" alt="Team Building" />
              <div className="card-body">
                <h5 className="card-title">Family Reunion</h5>
                <p className="card-text">Services included: , Family Reunion Decoration, Swimming pool, Water Sports, Rooms, and Catering with a maximum of 5 food that you can request.</p>
                <Link to="Reservationpage">
                <a href="#" className="btn btn-primary">Reserve Now</a>
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div id='ServiceCard' className="card">
              <img src={teambimg} className="card-img-top" alt="Team Building" />
              <div className="card-body">
                <h5 className="card-title">Team Building</h5>
                <p className="card-text">Services included: MC, Team Building Decoration, Swimming Pool, Water Sport, Rooms, and Catering with a maximum of 5 food that you can request.</p>
                <Link to="Reservationpage">
                <a href="#" className="btn btn-primary">Reserve Now</a>
                </Link>
              </div>
            </div>
          </div>

        </div>



      </div>
    </>
  );
}
