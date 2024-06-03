import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

export default function ReservationForm({ 
    handleNextClick,
    GuestInfo, 
    setGuestInfo,
    selectedEvent, 
    setSelectedEvent,
    startDate, 
    setStartDate, 
    endDate, 
    setEndDate  
 }) {

    /* ====================== DATE PICKER FUNCTION CODES START HERE ====================== */
        const currentDate = new Date();
    
        const handleStartDateChange = (date) => {
            setStartDate(date);
            setGuestInfo((prevInfo) => ({ ...prevInfo, StartDate: date }));
            if (date > endDate) {
                setEndDate(date);
                setGuestInfo((prevInfo) => ({ ...prevInfo, EndDate: date }));
            }
            setFormErrors((prevErrors) => ({ ...prevErrors, StartDate: null }));
        };
    
        const handleEndDateChange = (date) => {
            setEndDate(date);
            setGuestInfo((prevInfo) => ({ ...prevInfo, EndDate: date }));
            setFormErrors((prevErrors) => ({ ...prevErrors, EndDate: null }));
        };       
    /* ====================== DATE PICKER FUNCTION CODES END HERE ====================== */

    /* ====================== EVENT SELECTION FUNCTION CODES START HERE ====================== */
        const handleEventChange = (event) => {
            setSelectedEvent(event.target.value);
            if (event.target.value !== '') {
                setFormErrors((prevErrors) => ({ ...prevErrors, selectedEvent: null }));
            }
        };

    /* ====================== EVENT SELECTION FUNCTION CODES END HERE ====================== */

    /* ====================== FORM REMINDER TO FILL UP FUNCTION CODES START HERE ====================== */
        
        const [FormErrors, setFormErrors] = useState({});

        const validateForm = (GuestInfo, selectedEvent, startDate, endDate) => {
            const errors = {};
            if (!GuestInfo.FirstName) errors.FirstName = 'First Name is required';
            if (!GuestInfo.LastName) errors.LastName = 'Last Name is required';
            if (!GuestInfo.Email) errors.Email = 'Email is required';
            if (!GuestInfo.PhoneNumber) errors.PhoneNumber = 'Mobile Number is required';
            if (GuestInfo.KidsQty === '') errors.KidsQty = 'Number of kids is required';
            if (GuestInfo.AdultsQty === '') errors.AdultsQty = 'Number of adults is required';
            if (GuestInfo.SeniorsQty === '') errors.SeniorsQty = 'Number of seniors is required';
            if (selectedEvent === 'Other Events' && !GuestInfo.OtherEvent) errors.OtherEvent = 'Please specify the other event';
            if (!selectedEvent) errors.selectedEvent = 'Event selection is required';
            if (!startDate) errors.StartDate = 'Start Date is required';
            if (!endDate) errors.EndDate = 'End Date is required';
            return errors;
        };

        const handleInputChange = (event) => {
            const { id, value } = event.target;
            setGuestInfo((prevGuestInfo) => ({
                ...prevGuestInfo,
                [id]: value < 0 ? 0 : value
            }));
    
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [id]: value ? null : prevErrors[id]
            }));
        };
    
        const handleGuestRequirments = () => {
            const errors = validateForm(GuestInfo, selectedEvent, startDate, endDate);
            if (Object.keys(errors).length > 0) {
                setFormErrors(errors);
            } else {
                handleNextClick();
            }
        };

    /* ====================== FORM REQUIREMENTS FUNCTION CODES START HERE ====================== */

        // const Event = selectedEvent === 'Other Events' ? `Other Events/${GuestInfo.OtherEvent}` : selectedEvent;
        // const StartDate = GuestInfo.StartDate ? format(GuestInfo.StartDate, 'yyyy/MM/dd') : '';
        // const EndDate = GuestInfo.EndDate ? format(GuestInfo.EndDate, 'yyyy/MM/dd') : '';
        
        // const logGuestInfo = () => {
        //     console.log({ ...GuestInfo, Event,StartDate,EndDate });
        // };

  return (
    <>
    
        <div className='formmain'>

            <div id='RformMainDiv' className='container'>

                <div id='FormTitle' className='container'>
                    <h1>Reservation Form</h1>
                </div>

                <form id='Forms' className="row g-3 needs-validation" noValidate>

                    <div className="col-md-6">

                        <label htmlFor="FirstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            className={`form-control ${FormErrors.FirstName ? 'is-invalid' : ''}`}
                            id="FirstName"
                            value= {GuestInfo.FirstName}
                            onChange={handleInputChange}
                            required
                        />
                        {FormErrors.FirstName && <div className="invalid-feedback">{FormErrors.FirstName}</div>}    
                    </div>

                    <div className="col-md-6">

                        <label htmlFor="LastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className={`form-control ${FormErrors.LastName ? 'is-invalid' : ''}`}
                            id="LastName"
                            value= {GuestInfo.LastName}
                            onChange={handleInputChange}
                            required
                        />                           
                        {FormErrors.LastName && <div className="invalid-feedback">{FormErrors.LastName}</div>}
                    </div>

                    <div className="col-md-6">

                        <label htmlFor="Email" className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${FormErrors.Email ? 'is-invalid' : ''}`}
                            id="Email"
                            value= {GuestInfo.Email}
                            onChange={handleInputChange}
                            required
                        />
                        {FormErrors.Email && <div className="invalid-feedback">{FormErrors.Email}</div>}    
                    </div>

                    <div className="col-md-6">

                        <label htmlFor="PhoneNumber" className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            className={`form-control ${FormErrors.PhoneNumber ? 'is-invalid' : ''}`}
                            id="PhoneNumber"
                            value= {GuestInfo.PhoneNumber}
                            onChange={handleInputChange}
                            required
                        />                           
                        {FormErrors.PhoneNumber && <div className="invalid-feedback">{FormErrors.PhoneNumber}</div>}
                    </div>

                    <div className="col-md-4">

                        <label htmlFor="KidsQty" className="form-label">Kids</label>
                        <input
                            type="number"
                            className={`form-control ${FormErrors.KidsQty ? 'is-invalid' : ''}`}
                            id="KidsQty"
                            min="0"
                            value={GuestInfo.KidsQty}
                            onChange={handleInputChange}
                            required
                        />
                        {FormErrors.KidsQty && <div className="invalid-feedback">{FormErrors.KidsQty}</div>}
                    </div>

                    <div className="col-md-4">

                        <label htmlFor="AdultsQty" className="form-label">Adults</label>
                        <input
                            type="number"
                            className={`form-control ${FormErrors.AdultsQty ? 'is-invalid' : ''}`}
                            id="AdultsQty"
                            min="0"
                            value={GuestInfo.AdultsQty}
                            onChange={handleInputChange}
                            required
                        />
                        {FormErrors.AdultsQty && <div className="invalid-feedback">{FormErrors.AdultsQty}</div>}
                    </div> 

                    <div className="col-md-4">

                        <label htmlFor="SeniorsQty" className="form-label">Seniors</label>
                        <input
                            type="number"
                            className={`form-control ${FormErrors.SeniorsQty ? 'is-invalid' : ''}`}
                            id="SeniorsQty"
                            min="0"
                            value={GuestInfo.SeniorsQty}
                            onChange={handleInputChange}
                            required
                        />
                        {FormErrors.SeniorsQty && <div className="invalid-feedback">{FormErrors.SeniorsQty}</div>}
                    </div>                   

                    <div className="col-md-6">

                        <label htmlFor="StartDate" className="form-label">Start Date</label>
                        <div className="custom-datepicker">
                            <DatePicker
                                selected={GuestInfo.StartDate}
                                onChange={handleStartDateChange}
                                selectsStart
                                startDate={GuestInfo.StartDate}
                                endDate={GuestInfo.EndDate}
                                dateFormat="yyyy/MM/dd"
                                minDate={currentDate}
                                placeholderText={format(currentDate, 'yyyy/MM/dd')}
                                className={`form-control ${FormErrors.StartDate ? 'is-invalid' : ''}`}
                            />
                            {FormErrors.startDate && <div className="invalid-feedback">{FormErrors.startDate}</div>}    
                        </div>

                    </div>

                    <div className="col-md-6">

                        <label htmlFor="EndDate" className="form-label">End Date</label>
                        <div className="custom-datepicker">
                            <DatePicker
                                selected={GuestInfo.EndDate}
                                onChange={handleEndDateChange}
                                selectsEnd
                                startDate={GuestInfo.StartDate}
                                endDate={GuestInfo.EndDate}
                                minDate={GuestInfo.StartDate}
                                dateFormat="yyyy/MM/dd"
                                placeholderText={format(currentDate, 'yyyy/MM/dd')}
                                className={`form-control ${FormErrors.EndDate ? 'is-invalid' : ''}`}
                            />
                            {FormErrors.endDate && <div className="invalid-feedback">{FormErrors.endDate}</div>}
                        </div>

                    </div>

                    <div className="col-md-12">

                        <label htmlFor="event" className="form-label">Events</label>
                        <select
                            className={`form-select ${FormErrors.selectedEvent ? 'is-invalid' : ''}`}
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
                        {FormErrors.selectedEvent && <div className="invalid-feedback">{FormErrors.selectedEvent}</div>}     
                    </div>

                    {selectedEvent === 'Other Events' && (
                        <div className="col-md-12">

                            <label htmlFor="OtherEvent" className="form-label">Please specify</label>
                            <input
                                type="text"
                                className={`form-control ${FormErrors.OtherEvent ? 'is-invalid' : ''}`}
                                id="OtherEvent"
                                value={GuestInfo.OtherEvent}
                                onChange={handleInputChange}
                                required
                            />
                            {FormErrors.OtherEvent && <div className="invalid-feedback">{FormErrors.OtherEvent}</div>}      
                        </div>
                    )}


                </form>

                <div className='row'>
                    <div className='col'>
                        <div id='BackBtnDiv' className="d-grid gap-2 d-md-flex justify-content-md-end"> 
                            <button 
                                type="button" 
                                className="btn btn-lg btn-primary" 
                                onClick={handleGuestRequirments}
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </>
  )
}
