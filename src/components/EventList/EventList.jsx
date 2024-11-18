
import { Link } from 'react-router-dom';


const EventList = (props) => {
  return (
    <main>
    {props.events.map((event) => (
      <Link key={event._id} to={`/events/${event._id}`}>
        <article>
          <header>
            <h2>{event.title}</h2>
            <p>{event.date}</p>
          </header>
        </article>
      </Link>
    ))}
  </main>
);

};
  
  export default EventList;