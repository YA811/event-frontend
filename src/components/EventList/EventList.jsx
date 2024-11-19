import { Link } from 'react-router-dom';


const EventList = (props) => {
  return (
    <main>
    {props.events.map((event) => (
      <Link key={event._id} to={`/events/${event._id}`}>
        <article>
          <header>
            <h2>{event.title}</h2>
            <p>on {event.date.split('T')[0]}, at {event.date.split('T')[1].split('.')[0]}</p>
          </header>
        </article>
      </Link>
    ))}
  </main>
);

};
  
  export default EventList;