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
                <p className="card-text">Celebrate your special day at our resort! Enjoy a memorable birthday experience with your loved ones.</p>
                <br></br>
                <Link to="Reservation" className="btn btn-primary">
                 Reserve Now
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div id='ServiceCard' className="card">
              <img src={weddingimg} className="card-img-top" alt="Team Building" />
              <div className="card-body">
                <h5 className="card-title">Wedding</h5>
                <p className="card-text">Have your wedding at our resort. Enjoy great service and a stunning setting to make your day special.</p>
                <br></br>
                <Link to="Reservation" className="btn btn-primary">
                  Reserve Now
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div id='ServiceCard' className="card">
              <img src={familyimg} className="card-img-top" alt="Team Building" />
              <div className="card-body">
                <h5 className="card-title">Family Reunion</h5>
                <p className="card-text">Celebrate your family reunion at our resort. Enjoy fun activities, and quality time with your loved ones. </p>
                <br></br>
                <Link to="Reservation" className="btn btn-primary">
                  Reserve Now
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div id='ServiceCard' className="card">
              <img src={teambimg} className="card-img-top" alt="Team Building" />
              <div className="card-body">
                <h5 className="card-title">Team Building</h5>
                <p className="card-text">Host your team building event at our resort. Enjoy fun activities, and excellent facilities to strengthen your team's bond.</p>
                <Link to="Reservation" className="btn btn-primary">
                  Reserve Now
                </Link>
              </div>
            </div>
          </div>

        </div>



      </div>
    </>
  );
}
