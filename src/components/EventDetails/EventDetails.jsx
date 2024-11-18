import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as eventService from '../../services/eventService';
import AttendeeForm from '../AttendeeForm/AttendeeForm';

const EventDetails = (props) => {
    const { eventId } = useParams();

    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
          const eventData = await eventService.show(eventId);
          console.log('eventData', eventData);
          setEvent(eventData);
        };
        fetchEvent();
    }, [eventId]);
      
    console.log('event state:', event);

    const handleAddAttendee = async (attendeeFormData) => {
        const newAttendee = await eventService.createAttendee(eventId, attendeeFormData);
        setEvent({ ...event, attendees: [...event.attendees, newAttendee] });
    };

    if (!event) return <main>Loading...</main>;

    return (
        <main>
          <header>
            <h1>{event.title}</h1>
            <h2>on {event.date}</h2>
            <h2>{event.location}</h2>
            <p>{event.description}</p>
          </header>
          <section>
            <h2>Attendees List</h2>
            <AttendeeForm handleAddAttendee={handleAddAttendee} />
            {!event.attendees.length && <p>No attendees yet.</p>}

        {event.attendees.map((attendee) => (
            <article key={attendee._id}>
            <p>{attendee.name}</p>
            <p>{attendee.invitationStatus}</p>
            </article>
        ))}
          </section>
        </main>
    );
};
  
export default EventDetails;