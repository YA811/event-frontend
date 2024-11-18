import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import the authservice
import * as eventService from '../src/services/eventService'; // import the event
import EventList from './components/EventList/EventList'; // import the eventList component


export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      const eventsData = await eventService.index();
  
      // Set state:
      setEvents(eventsData);
    };
    if (user) fetchAllEvents();
  }, [user]);
  

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
  {user ? (
    // Protected Routes:
    <>
      <Route path="/" element={<Dashboard user={user} />} />
      <Route path="/events" element={<EventList events={events} />} />
    </>
  ) : (
    // Public Route:
    <Route path="/" element={<Landing />} />
  )}
  <Route path="/signup" element={<SignupForm setUser={setUser} />} />
  <Route path="/signin" element={<SigninForm setUser={setUser} />} />
</Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
