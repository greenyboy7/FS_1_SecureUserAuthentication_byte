import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Registration from './pages/Register';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistration, setShowRegistration] = useState(true);

  return isLoggedIn ? (
    <Dashboard onLogOut={() => setIsLoggedIn(false)} />
  ) : showRegistration ? (
    <Registration
      onGoToLogin={() => setShowRegistration(false)}
    />
  ) : (
    <Login
      onGoToRegister={() => setShowRegistration(true)}
      onLogInSuccess={() => setIsLoggedIn(true)}
    />
  );

} export default App;