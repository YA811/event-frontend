import { useParams } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as eventService from '../../services/eventService';
import AttendeeForm from '../AttendeeForm/AttendeeForm';
import { Link } from 'react-router-dom';

const EventDetails = (props) => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const user = useContext(AuthedUserContext);

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

    const handleDeleteAttendee = async (attendeeId) => {
      await eventService.deleteAttendee(eventId, attendeeId);
      setEvent({...event, attendees: event.attendees.filter((attendee) => attendee._id !== attendeeId),});
    };

    if (!event) return <main>Loading...</main>;

    return (
        <main>
          <header>
            <h1>{event.title}</h1>
            <h2>On {event.date.split('T')[0]}</h2>
            <h2>At {event.date.split('T')[1].split('.')[0]}</h2>
            <h2>{event.location}</h2>
            <p>{event.description}</p>
            {event.planner._id === user._id && (
            <>
            <Link to={`/events/${eventId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteEvent(eventId)}>Delete</button>
            </>
          )}
          </header>
          <section>
            <h2>Attendees List</h2>
            <AttendeeForm handleAddAttendee={handleAddAttendee} />
            {!event.attendees.length && <p>No attendees yet.</p>}

        {event.attendees.map((attendee) => (
            <article key={attendee._id}>
            <p>{attendee.name}</p>
            <p>{attendee.invitationStatus}</p>
            <div>
            {attendee._id && (
              <>
              <Link to={`/events/${eventId}/attendees/${attendee._id}/edit`}>Edit</Link>
              <button onClick={() => handleDeleteAttendee(attendee._id)}>Delete</button>
              </>
            )}
            </div>
            </article>
        ))}
          </section>
        </main>
    );
};
  
export default EventDetails;