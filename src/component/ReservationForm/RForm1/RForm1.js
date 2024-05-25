
import React, { useState } from 'react';
import Invoice from './Invoice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';


export default function RForm1() {
    /* ====================== FORM BUTTON FUNCTION START HERE ====================== */
    const [showReservationForm, setShowReservationForm] = useState(true);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [showInvoiceForm, setShowInvoiceForm] = useState(false);

    const handleFormNextClick = () => {
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
          if (showReservationForm) {
            setShowReservationForm(false);
            setShowServiceForm(true);
          } else if (showServiceForm) {
            setShowServiceForm(false);
            setShowInvoiceForm(true);
          }
        } else {
          setFormErrors(errors);
        }
      };

    const handleFormBackClick = () => {
        if (showInvoiceForm) {
            setShowInvoiceForm(false);
            setShowServiceForm(true);
        } else if (showServiceForm) {
            setShowServiceForm(false);
            setShowReservationForm(true);
        }
    };
    /* ====================== FORM BUTTON FUNCTION END HERE ====================== */

    /* ====================== DATE PICKER FUNCTION START HERE ====================== */
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const currentDate = new Date();

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (date > endDate) {
            setEndDate(date);
        }
        setFormErrors((prevErrors) => ({ ...prevErrors, startDate: null }));
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setFormErrors((prevErrors) => ({ ...prevErrors, endDate: null }));
    };       
    /* ====================== DATE PICKER FUNCTION START HERE ====================== */

    /* ====================== SELECT EVENT AND FORMS FUNCTION START HERE ====================== */
    const [selectedEvent, setSelectedEvent] = useState('');
    const [showEventForm, setShowEventForm] = useState(null);
    const [FormErrors, setFormErrors] = useState({});

    const [formFields, setFormFields] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        kids: '',
        adults: '',
        seniors: '',
        otherEvent: ''
    });

    /*================ SERVICES CHECKBOX FUNCTION START HERE ================*/
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedServicesPrices, setSelectedServicesPrices] = useState({});
    const SubtotalServicePrice = Object.values(selectedServicesPrices).reduce((acc, curr) => acc + curr, 0);

    const [servicePrices, setServicePrices] = useState({
        "Host/Emcee": 7000,
        "Event Themed Decorations": 3000,
        "Event Games": 3000,
        "Services": 6000,
        "Audio Visual Services": 7000,
        "Photography and Videography": 6000,
        "Catering": 10000
      });

      const handleServiceChange = (e, serviceValue) => {
        if (e.target.checked) {
          setSelectedServices([...selectedServices, serviceValue]);
          setSelectedServicesPrices((prevPrices) => ({
            ...prevPrices,
            [serviceValue]: servicePrices[serviceValue]
          }));
        } else {
          setSelectedServices(selectedServices.filter((value) => value !== serviceValue));
          setSelectedServicesPrices((prevPrices) => {
            const newPrices = { ...prevPrices };
            delete newPrices[serviceValue];
            return newPrices;
          });
        }
      };


     /*================ CHECKBOX FUNCTION END HERE ================*/

    const handleEventChange = (event) => {
        setSelectedEvent(event.target.value);
        if (event.target.value !== '') {
            setFormErrors((prevErrors) => ({ ...prevErrors, selectedEvent: null }));
        }
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormFields((prevFormFields) => ({
            ...prevFormFields,
            [id]: value < 0 ? 0 : value
        }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [id]: value ? null : prevErrors[id]
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formFields.firstName) errors.firstName = 'First Name is required';
        if (!formFields.lastName) errors.lastName = 'Last Name is required';
        if (!formFields.email) errors.email = 'Email is required';
        if (!formFields.mobileNumber) errors.mobileNumber = 'Mobile Number is required';
        if (formFields.kids === '') errors.kids = 'Number of kids is required';
        if (formFields.adults === '') errors.adults = 'Number of adults is required';
        if (formFields.seniors === '') errors.seniors = 'Number of seniors is required';
        if (selectedEvent === 'Other Events' && !formFields.otherEvent) errors.otherEvent = 'Please specify the other event';
        if (!selectedEvent) errors.selectedEvent = 'Event selection is required';
        if (!startDate) errors.startDate = 'Start Date is required';
        if (!endDate) errors.endDate = 'End Date is required';
        return errors;
    };

    /* ====================== SELECT EVENT AND FORMS FUNCTION END HERE ====================== */

    /* ====================== CATERING CHECKBOX AND TEXTBOXES FUNCTION START HERE ====================== */
    const [showTextboxes, setShowTextboxes] = useState(false);
    const [foodRequests, setFoodRequests] = useState(Array(5).fill(''));

    const handleCheckboxChange = () => {
                setShowTextboxes(!showTextboxes);              
    };

    const handleCateringCheckboxChange = (e) => {
        handleCheckboxChange(e);
        handleServiceChange(e, "Catering");
      };

      const handleFoodRequestChange = (index, value) => {
        setFoodRequests((prevRequests) => {
            const newRequests = [...prevRequests];
            newRequests[index] = value;
            return newRequests;
        });
    };
    
    /* ====================== CHECKBOX AND TEXTBOXES FUNCTION END HERE ====================== */

    return (
        <>
            <div className='formmain'>

                {showReservationForm ? (
                    <div id='RformMainDiv' className='container'>

                        <div id='FormTitle' className='container'>
                            <h1>Reservation Form</h1>
                        </div>

                        <form id='Forms' className="row g-3 needs-validation" noValidate>
                            <div className="col-md-6">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${FormErrors.firstName ? 'is-invalid' : ''}`}
                                    id="firstName"
                                    value={formFields.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">{FormErrors.firstName}</div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${FormErrors.lastName ? 'is-invalid' : ''}`}
                                    id="lastName"
                                    value={formFields.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">{FormErrors.lastName}</div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${FormErrors.email ? 'is-invalid' : ''}`}
                                    id="email"
                                    value={formFields.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">{FormErrors.email}</div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                                <input
                                    type="tel"
                                    className={`form-control ${FormErrors.mobileNumber ? 'is-invalid' : ''}`}
                                    id="mobileNumber"
                                    value={formFields.mobileNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">{FormErrors.mobileNumber}</div>
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="kids" className="form-label">Kids</label>
                                <input
                                    type="number"
                                    className={`form-control ${FormErrors.kids ? 'is-invalid' : ''}`}
                                    id="kids"
                                    min="0"
                                    value={formFields.kids}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">{FormErrors.kids}</div>
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="adults" className="form-label">Adults</label>
                                <input
                                    type="number"
                                    className={`form-control ${FormErrors.adults ? 'is-invalid' : ''}`}
                                    id="adults"
                                    min="0"
                                    value={formFields.adults}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">{FormErrors.adults}</div>
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="seniors" className="form-label">Seniors</label>
                                <input
                                    type="number"
                                    className={`form-control ${FormErrors.seniors ? 'is-invalid' : ''}`}
                                    id="seniors"
                                    min="0"
                                    value={formFields.seniors}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">{FormErrors.seniors}</div>
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
                                    {FormErrors.startDate && <div className="invalid-feedback d-block">{FormErrors.startDate}</div>}
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
                                    {FormErrors.endDate && <div className="invalid-feedback d-block">{FormErrors.endDate}</div>}
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
                                <div className="invalid-feedback">{FormErrors.selectedEvent}</div>
                            </div>

                            {selectedEvent === 'Other Events' && (
                                <div className="col-md-12">
                                    <label htmlFor="otherEvent" className="form-label">Please specify</label>
                                    <input
                                        type="text"
                                        className={`form-control ${FormErrors.otherEvent ? 'is-invalid' : ''}`}
                                        id="otherEvent"
                                        value={formFields.otherEvent}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="invalid-feedback">{FormErrors.otherEvent}</div>
                                </div>
                            )}

                            <div className="d-grid gap-2 d-md-flex justify-content-md-end"> 
                                <button type="button" id="FormsNxtBtn" className="btn btn-lg" onClick={handleFormNextClick}>
                                    Next
                                </button>
                            </div>
                        </form>
                    </div>

                /* ======================= Service Form =======================*/
                /* ======================= Service Form =======================*/
                /* ======================= Service Form =======================*/

                ) : showServiceForm ? (
                    <div id='RformMainDiv' className='container'>

                        <div id='FormTitle' className='container'>
                            <h1>Services</h1>
                        </div>

                        <form id='Forms' className="row g-3 needs-validation" noValidate>

                            
                            <div className="col-md-4">

                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <input 
                                            class="form-check-input me-1" 
                                            type="checkbox" 
                                            value="Host/Emcee" 
                                            id="HostCheckbox"
                                            checked={selectedServices.includes("Host/Emcee")}
                                            onChange={(e) => handleServiceChange(e, "Host/Emcee")}
                                        />
                                        <label class="form-check-label" for="HostCheckbox">Host/Emcee - ₱7,000</label>
                                    </li>
                                </ul>

                            </div>

                            <div className="col-md-4">

                                <ul class="list-group">


                                    <li class="list-group-item">
                                        <input 
                                            class="form-check-input me-1" 
                                            type="checkbox" 
                                            value="Event Themed Decorations" 
                                            id="EventDecorationCheckbox"
                                            checked={selectedServices.includes("Event Themed Decorations")}
                                            onChange={(e) => handleServiceChange(e, "Event Themed Decorations")}
                                        />
                                        <label class="form-check-label" for="EventDecorationCheckbox">Event Themed Decorations - ₱3,000</label>
                                    </li>
                                </ul>

                            </div>

                            <div className="col-md-4">

                                <ul class="list-group">

                                    <li class="list-group-item">
                                        <input 
                                            class="form-check-input me-1" 
                                            type="checkbox" 
                                            value="Event Games" 
                                            id="EventGamesCheckbox"
                                            checked={selectedServices.includes("Event Games")}
                                            onChange={(e) => handleServiceChange(e, "Event Games")}
                                        />
                                        <label class="form-check-label" for="EventGamesCheckbox">Event Games - ₱3,000</label>
                                    </li>
                                </ul>

                            </div>

                            <div className="col-md-4">

                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <input 
                                            class="form-check-input me-1" 
                                            type="checkbox" 
                                            value="Services" 
                                            id="ServicesCheckbox"
                                            checked={selectedServices.includes("Services")}
                                            onChange={(e) => handleServiceChange(e, "Services")}
                                        />
                                        <label class="form-check-label" for="ServicesCheckbox">Services - ₱6,000</label>
                                    </li>
                                </ul>

                            </div>

                            <div className="col-md-4">

                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <input 
                                            class="form-check-input me-1" 
                                            type="checkbox" 
                                            value="Audio Visual Services" 
                                            id="AudioVisualServicesCheckbox"
                                            checked={selectedServices.includes("Audio Visual Services")}
                                            onChange={(e) => handleServiceChange(e, "Audio Visual Services")}
                                        />
                                        <label class="form-check-label" for="AudioVisualServicesCheckbox">Audio Visual Services - ₱7,000</label>
                                    </li>
                                </ul>

                            </div>

                            <div className="col-md-4">

                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <input 
                                            class="form-check-input me-1" 
                                            type="checkbox" 
                                            value="Photography and Videography" 
                                            id="PhotographyVideographyCheckbox"
                                            checked={selectedServices.includes("Photography and Videography")}
                                            onChange={(e) => handleServiceChange(e, "Photography and Videography")}
                                        />
                                        <label class="form-check-label" for="PhotographyVideographyCheckbox">Photography and Videography - ₱6,000</label>
                                    </li>
                                </ul>

                            </div>

                            <div className="col-md-4">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                    <input 
                                        className="form-check-input me-1" 
                                        type="checkbox" 
                                        value="Catering" 
                                        id="CateringCheckbox" 
                                        checked={selectedServices.includes("Catering")}
                                        onChange={(e) => handleCateringCheckboxChange(e, "Catering")} 
                                    />
                                    <label className="form-check-label" htmlFor="cateringCheckbox">Catering - ₱10,000</label>
                                    </li>
                                </ul>
                                <br></br>
                                {showTextboxes && (
                                <div className="col-md-12">
                                    {foodRequests.map((request, index) => (
                                        <input 
                                            key={index}
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder={`Food Request ${index + 1}`}
                                            value={request}
                                            onChange={(e) => handleFoodRequestChange(index, e.target.value)}
                                        />
                                    ))}
                                </div>
                                )}

                            </div>




                            <div id='BackBtnDiv' className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="button" id="FormsBackBtn" className="btn btn-lg" onClick={handleFormBackClick}>
                                    Back
                                </button>
                                <button type="button" id="FormsNxtBtn" className="btn btn-lg" onClick={handleFormNextClick}>
                                    Next
                                </button>
                            </div>
                        </form>

                    </div>

                /* ======================= Invoice Form =======================*/
                ) : showInvoiceForm ? (
                    // <div id='invoice' className='container'></div>

                        <div id='RformMainDiv' className='container'>
                            <div id='FormTitle' className='container'>
                                <h1>Invoice</h1>
                            </div>
                            <Invoice 
                                formData={formFields} 
                                startDate={format(startDate, 'yyyy/MM/dd')} 
                                endDate={format(endDate, 'yyyy/MM/dd')}
                                selectedEvent={selectedEvent === 'Other Events' ? `Other Events/${formFields.otherEvent}` : selectedEvent}
                                selectedServices={selectedServices}
                                selectedServicesPrices={selectedServicesPrices}
                                SubtotalServicePrice={SubtotalServicePrice}
                                foodRequests={foodRequests}  
                            />

                            <div id='BackBtnDiv' className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="button" id="FormsBackBtn" className="btn btn-lg" onClick={handleFormBackClick}>
                                    Back
                                </button>
                                <button type="button" id="FormsBackBtn" className="btn btn-lg" >
                                    Submit
                                </button>
                            </div>

                        </div>
                    

                ) : null}

            </div>
        </>
    );
}
