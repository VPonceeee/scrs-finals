import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button, Form } from 'react-bootstrap';

const localizer = momentLocalizer(moment);

const initialEvents = [
  {
    title: '',
    start: '',
    end: '',
    allDay: '',
  },
];

const CustomToolbar = (toolbar) => {
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={() => toolbar.onNavigate('PREV')}>
          Back
        </button>
      </span>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
      <span className="rbc-btn-group">
        <button type="button" onClick={() => toolbar.onNavigate('NEXT')}>
          Next
        </button>
      </span>
    </div>
  );
};

export default function AdminCalendar() {
  const [events, setEvents] = useState(initialEvents);
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: ''
  });

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
    });
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      start: '',
      end: ''
    });
  };

  const handleSave = () => {
    if (selectedEvent) {
      // Update existing event
      setEvents(events.map(event =>
        event === selectedEvent
          ? { ...event, title: newEvent.title, start: new Date(newEvent.start), end: new Date(newEvent.end) }
          : event
      ));
    } else {
      // Add new event
      setEvents([
        ...events,
        {
          title: newEvent.title,
          start: new Date(newEvent.start),
          end: new Date(newEvent.end),
          allDay: false,
        },
      ]);
    }
    handleClose();
  };

  const handleDelete = () => {
    if (selectedEvent) {
      // Delete existing event
      setEvents(events.filter(event => event !== selectedEvent));
    }
    handleClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  return (
    <>
      <div className="container mt-5">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
          selectable
          onSelectSlot={(slotInfo) => {
            setNewEvent({
              title: '',
              start: moment(slotInfo.start).format('YYYY-MM-DDTHH:mm'),
              end: moment(slotInfo.end).format('YYYY-MM-DDTHH:mm'),
            });
            setShow(true);
          }}
          components={{ toolbar: CustomToolbar }}
        />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent ? 'Edit Event' : 'New Event'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formEventTitle">
                <Form.Label>Event Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formEventStart">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="start"
                  value={newEvent.start}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formEventEnd">
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="end"
                  value={newEvent.end}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {selectedEvent && (
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
