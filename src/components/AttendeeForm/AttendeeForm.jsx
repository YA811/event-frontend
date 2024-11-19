import { useState , useEffect } from 'react';
import * as eventService from '../../services/eventService';
import { useParams, useNavigate } from 'react-router-dom';

const AttendeeForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    invitationStatus: 'pending',
  });

  const { eventId, attendeeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await eventService.show(eventId);
      setFormData(eventData.attendees.find((attendee) => attendee._id === attendeeId));
    };
    if (eventId && attendeeId) fetchEvent();
  }, [eventId, attendeeId]);

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (eventId && attendeeId) {
      eventService.updateAttendee(eventId, attendeeId, formData);
      navigate(`/events/${eventId}`);
    } else {
      props.handleAddAttendee(formData);
    }
    setFormData({ name: '', invitationStatus: 'pending' });
  };

  if (eventId && attendeeId) return (
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">Attendee Name:</label>
      <input
        required
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="invitationStatus:">Invitation Status:</label>
      <select
        required
        name="invitationStatus"
        id="invitationStatus"
        value={formData.invitationStatus}
        onChange={handleChange}
      >
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Declined</option>
      </select>
      <button type="submit">Add Attendee</button>
      </form>
  );

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Attendee Name:</label>
      <input
        required
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="invitationStatus:">Invitation Status:</label>
      <select
        required
        name="invitationStatus"
        id="invitationStatus"
        value={formData.invitationStatus}
        onChange={handleChange}
      >
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Declined</option>
      </select>
      <button type="submit">Add Attendee</button>
    </form>
  );
};

export default AttendeeForm;