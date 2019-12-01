import React from 'react';
import NavBar from './Components/Navbar/Nav';
import LandingPage from './Components/Home/LandingPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <LandingPage />
    </div>
  );
}

export default App;
