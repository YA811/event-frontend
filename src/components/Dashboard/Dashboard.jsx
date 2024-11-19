import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  return (
    <main>
      <h1>Welcome to Evenzo, {user.username}</h1>
      <p>You’ve got this! Planning your dream event starts here.</p>
    </main>
  );
};

export default Dashboard;
