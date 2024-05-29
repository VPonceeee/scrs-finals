import React, { useState } from 'react';
import ReservationForm from '../ReservationForm/ReservationForm'
import ReservationService from '../ReservationService/ReservationService'
import ReservationInvoice from '../ReservationInvoice/ReservationInvoice';

export default function ReservationPage() {

  const [showReservationForm, setShowReservationForm] = useState(true);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);

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

  return (

    <>

      {showReservationForm ? (
        <ReservationForm handleNextClick={handleNextClick} />
      ) : showServiceForm ? (
        <ReservationService handleBackClick={handleBackClick} handleNextClick={handleNextClick} />
      ) : showInvoiceForm ? (
        <ReservationInvoice handleBackClick={handleBackClick} />
      ) : null}
      
    </>

  )
}
