import React, { useState } from 'react';

export default function ReservationService({ handleBackClick, handleNextClick }) {

    // ==================== CHECKBOX CATERING FUNCTION CODES START HERE ====================

        const [showTextboxes, setShowTextboxes] = useState(false);

        const handleCheckboxChange = () => {
            setShowTextboxes(!showTextboxes);              
        };

        const [foodRequests, setFoodRequests] = useState(Array(5).fill(''));

        const handleFoodRequestChange = (index, value) => {
            setFoodRequests((prevRequests) => {
                const newRequests = [...prevRequests];
                newRequests[index] = value;
                return newRequests;
            });
        };

        const handleCateringCheckboxChange = (e) => {
            handleCheckboxChange(e);
            //handleServiceChange(e, "Catering");
        };
    // ==================== CHECKBOX CATERING FUNCTION CODES END HERE ====================
  return (

    <>
    
        <div className='formmain'> 

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
                                    //checked={selectedServices.includes("Host/Emcee")}
                                    //onChange={(e) => handleServiceChange(e, "Host/Emcee")}
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
                                    //checked={selectedServices.includes("Event Themed Decorations")}
                                   // onChange={(e) => handleServiceChange(e, "Event Themed Decorations")}
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
                                    //checked={selectedServices.includes("Event Games")}
                                    //onChange={(e) => handleServiceChange(e, "Event Games")}
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
                                    //checked={selectedServices.includes("Services")}
                                    //onChange={(e) => handleServiceChange(e, "Services")}
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
                                    //checked={selectedServices.includes("Audio Visual Services")}
                                   // onChange={(e) => handleServiceChange(e, "Audio Visual Services")}
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
                                    //checked={selectedServices.includes("Photography and Videography")}
                                    //onChange={(e) => handleServiceChange(e, "Photography and Videography")}
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
                                    //checked={selectedServices.includes("Catering")}
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
                        <button 
                            type="button" 
                            id="FormsBackBtn" 
                            className="btn btn-lg" 
                            onClick={handleBackClick}
                        >
                            Back
                        </button>
                            
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
