import React, { useState } from 'react';

export default function ReservationRequest() {

    const [modalData, setModalData] = useState(null);

    const handleViewClick = (data) => {
      setModalData(data);
      const modal = new window.bootstrap.Modal(document.getElementById('viewModal'));
      modal.show();
    };

  return (
    <>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Event</th>
                    <th scope="col">Date of Reservation</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>text</td>
                    <td>text</td>
                    <td>text</td>
                    <td>Date</td>
                    <td>text</td>
                    <div className='ActionBtn'>
                        <button className="btn btn-primary" onClick={() => handleViewClick({ first: 'Mark', last: 'Otto', handle: '@mdo' })}>
                            View
                        </button>
                        <button type="button" class="btn btn-success">Confirm</button>
                        <button type="button" class="btn btn-danger">Decline</button>
                    </div>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>text</td>
                    <td>text</td>
                    <td>text</td>
                    <td>Date</td>
                    <td>text</td>
                    <div className='ActionBtn'>
                        <button className="btn btn-primary" onClick={() => handleViewClick({ first: 'Mark', last: 'Otto', handle: '@mdo' })}>
                            View
                        </button>
                        <button type="button" class="btn btn-success">Confirm</button>
                        <button type="button" class="btn btn-danger">Decline</button>
                    </div>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>text</td>
                    <td>text</td>
                    <td>text</td>
                    <td>Date</td>
                    <td>text</td>
                    <div className='ActionBtn'>     
                        <button className="btn btn-primary" onClick={() => handleViewClick({ first: 'text', last: 'text', handle: 'text' })}>
                            View
                        </button>       
                        <button type="button" class="btn btn-success">Confirm</button>
                        <button type="button" class="btn btn-danger">Decline</button>
                    </div>

                </tr>
            </tbody>
        </table>

        <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewModalLabel">View Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {modalData && (
                <div>
                  <p><strong>First Name:</strong> {modalData.first}</p>
                  <p><strong>Last Name:</strong> {modalData.last}</p>
                  <p><strong>Event:</strong> {modalData.handle}</p>
                  <p><strong>Date of Reservation:</strong> {modalData.handle}</p>
                  <p><strong>Status:</strong> {modalData.handle}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
