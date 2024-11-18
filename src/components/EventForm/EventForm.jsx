import { useState } from 'react';

const EventForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
  
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddEvent(formData);
  };
  

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Event Title</label>
        <input
          required
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="description">Event description</label>
        <textarea
          required
          type="text"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        /> 

         <label htmlFor="date">Event date</label>
        <input 
          required
          type="datetime-local"
          name="date"
          id="date"
          onChange={handleChange}
        />
        
         <label htmlFor="location">Event location</label>
        <textarea
          required
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
        />

        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default EventForm;