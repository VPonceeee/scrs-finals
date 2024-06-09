import React, { useState } from 'react';
import ReservationForm from '../ReservationForm/ReservationForm'
import ReservationService from '../ReservationService/ReservationService';
import ReservationInvoice from '../ReservationInvoice/ReservationInvoice';
import ReservationMess from '../ReservationMess/ReservationMess';
import { format } from 'date-fns';

export default function ReservationPage() {

  // ====================== BUTTON FUNCTION CODES START HERE ======================
    const [showReservationForm, setShowReservationForm] = useState(true);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [showInvoiceForm, setShowInvoiceForm] = useState(false);
    const [showReservationMess, setReservationMess] = useState(false);

    const handleNextClick = () => {
        if (showReservationForm) {
        setShowReservationForm(false);
        setShowServiceForm(true);
        } else if (showServiceForm) {
        setShowServiceForm(false);
        setShowInvoiceForm(true);
        }
    };

    const handleBackClick = () => {
        if (showInvoiceForm) {
        setShowInvoiceForm(false);
        setShowServiceForm(true);
        } else if (showServiceForm) {
        setShowServiceForm(false);
        setShowReservationForm(true);
        }
    };

    const handleSubmitClick = () => {
      if (showInvoiceForm) {
      setShowInvoiceForm(false);
      setReservationMess(true);
      }
  };

  // ====================== BUTTON FUNCTION CODES END HERE ======================

  // ====================== DATA HOLDER CODES START HERE ======================

      const [selectedEvent, setSelectedEvent] = useState('');
      const [startDate, setStartDate] = useState(null);
      const [endDate, setEndDate] = useState(null);
      const [GuestInfo, setGuestInfo] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        KidsQty: '',
        AdultsQty: '',
        SeniorsQty: '',
        OtherEvent: '',
        StartDate: null,
        EndDate: null
      });

   // ====================== DATA HOLDER CODES END HERE ======================

   // ====================== CHECKBOX FUNCTION CODES START HERE ======================

      const [SelectedServices, setSelectedServices] = useState([]);
      const [SelectedServicesPrices, setSelectedServicesPrices] = useState({});
      const [foodRequests, setFoodRequests] = useState(Array(5).fill(''));

   // ====================== CHECKBOX FUNCTION CODES END HERE ======================

  return (

    <>
      {showReservationForm ? (

        <ReservationForm 
          handleNextClick={handleNextClick}
          GuestInfo={GuestInfo}
          setGuestInfo={setGuestInfo}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

      ) : showServiceForm ? (

        <ReservationService 
          handleBackClick={handleBackClick} 
          handleNextClick={handleNextClick}
          SelectedServices={SelectedServices}
          setSelectedServices={setSelectedServices}
          SelectedServicesPrices={SelectedServicesPrices}
          setSelectedServicesPrices={setSelectedServicesPrices}
          foodRequests={foodRequests}
          setFoodRequests={setFoodRequests}
        />

      ) : showInvoiceForm ? (

        <ReservationInvoice 
          handleBackClick={handleBackClick}
          handleSubmitClick={handleSubmitClick}
          GuestInfo={GuestInfo}
          startDate={format(startDate, 'yyyy/MM/dd')} 
          endDate={format(endDate, 'yyyy/MM/dd')}
          selectedEvent={selectedEvent}
          SelectedServices={SelectedServices}
          SelectedServicesPrices={SelectedServicesPrices}
          foodRequests={foodRequests}
        />

      ) : showReservationMess ? (
        <ReservationMess/>
        
      ): null}

    </>

  )
}
