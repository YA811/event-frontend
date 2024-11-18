import { useState } from 'react';
const AttendeeForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    invitationStatus: 'pending',
  });
  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    props.handleAddAttendee(formData);
    setFormData({ name: '', invitationStatus: 'pending' });
  }
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