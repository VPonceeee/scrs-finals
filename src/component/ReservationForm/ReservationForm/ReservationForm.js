import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

export default function ReservationForm({ handleNextClick } ) {

    /* ====================== DATE PICKER FUNCTION START HERE ====================== */
        const [startDate, setStartDate] = useState(null);
        const [endDate, setEndDate] = useState(null);
        const currentDate = new Date();
    
        const handleStartDateChange = (date) => {
            setStartDate(date);
            if (date > endDate) {
                setEndDate(date);
            }
            //setFormErrors((prevErrors) => ({ ...prevErrors, startDate: null }));
        };
    
        const handleEndDateChange = (date) => {
            setEndDate(date);
            //setFormErrors((prevErrors) => ({ ...prevErrors, endDate: null }));
        };       
    /* ====================== DATE PICKER FUNCTION END HERE ====================== */

    /* ====================== EVENT SELECTION FUNCTION START HERE ====================== */
        const [selectedEvent, setSelectedEvent] = useState('');
        const handleEventChange = (event) => {
            setSelectedEvent(event.target.value);
            if (event.target.value !== '') {
                //setFormErrors((prevErrors) => ({ ...prevErrors, selectedEvent: null }));
            }
        };

    /* ====================== EVENT SELECTION FUNCTION END HERE ====================== */

  return (
    <>
    
        <div className='formmain'>

            <div id='RformMainDiv' className='container'>

                <div id='FormTitle' className='container'>
                    <h1>Reservation Form</h1>
                </div>

                <form id='Forms' className="row g-3 needs-validation" noValidate>

                    <div className="col-md-6">

                        <label htmlFor="Firstname" className="form-label">First Name</label>
                        <input
                            type="text"
                            className={`form-control`}
                            id="Firstname"
                            required
                        />
                            
                    </div>

                    <div className="col-md-6">

                        <label htmlFor="Lastname" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className={`form-control`}
                            id="Lastname"
                            required
                        />                           

                    </div>

                    <div className="col-md-6">

                        <label htmlFor="Email" className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control`}
                            id="Email"
                            required
                        />
                            
                    </div>

                    <div className="col-md-6">

                        <label htmlFor="PhoneNumber" className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            className={`form-control`}
                            id="PhoneNumber"
                            required
                        />                           

                    </div>

                    <div className="col-md-4">
     
                        <label htmlFor="kids" className="form-label">Kids</label>
                        <input
                            type="number"
                            className={`form-control`}
                            id="kids"
                            min="0"
                            //value={formFields.kids}
                            //onChange={handleInputChange}
                            required
                        />

                    </div>

                    <div className="col-md-4">
     
                        <label htmlFor="Adults" className="form-label">Adults</label>
                        <input
                            type="number"
                            className={`form-control`}
                            id="Adults"
                            min="0"
                            //value={formFields.kids}
                            //onChange={handleInputChange}
                            required
                        />

                    </div> 

                    <div className="col-md-4">
     
                        <label htmlFor="Seniors" className="form-label">Seniors</label>
                        <input
                            type="number"
                            className={`form-control`}
                            id="Seniors"
                            min="0"
                            //value={formFields.kids}
                            //onChange={handleInputChange}
                            required
                        />

                    </div>                   

                    <div className="col-md-6">

                        <label htmlFor="StartDate" className="form-label">Start Date</label>
                        <div className="custom-datepicker">
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                dateFormat="yyyy/MM/dd"
                                minDate={currentDate}
                                placeholderText={format(currentDate, 'yyyy/MM/dd')}
                            />
                                 
                        </div>

                    </div>

                    <div className="col-md-6">

                        <label htmlFor="EndDate" className="form-label">End Date</label>
                        <div className="custom-datepicker">
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                dateFormat="yyyy/MM/dd"
                                placeholderText={format(currentDate, 'yyyy/MM/dd')}
                            />
                        </div>

                    </div>

                    <div className="col-md-12">

                        <label htmlFor="event" className="form-label">Events</label>
                        <select
                            className={`form-select `}
                            id="event"
                            required
                            value={selectedEvent}
                            onChange={handleEventChange}
                        >
                                
                            <option value="" disabled hidden>Select event</option>
                            <option value="Birthday">Birthday - ₱20,000</option>
                            <option value="Wedding">Wedding - ₱25,000</option>
                            <option value="Family Reunion">Family Reunion - ₱15,000</option>
                            <option value="Team Building">Team Building - ₱20,000</option>
                            <option value="Other Events">Other events - ₱18,000</option>

                        </select>
                                
                    </div>

                    {selectedEvent === 'Other Events' && (
                        <div className="col-md-12">

                            <label htmlFor="otherEvent" className="form-label">Please specify</label>
                            <input
                                type="text"
                                className={`form-control`}
                                id="otherEvent"
                                //value={formFields.otherEvent}
                                //onChange={handleInputChange}
                                required
                            />
                                    
                        </div>
                    )}

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end"> 
                        <button 
                            type="button" 
                            id="FormsNxtBtn" 
                            className="btn btn-lg" 
                            onClick={handleNextClick}
                        >
                            Next
                        </button>
                    </div>

                </form>

            </div>



        </div>

    </>
  )
}
