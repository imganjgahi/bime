import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './Components/Navbar/Nav';
import LandingPage from './Components/Home/LandingPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <div className="container">

    <Router>
    <Switch>

      <Route path = "/" component = {LandingPage} />
    </Switch>
    </Router>
    </div>
    </div>
  );
}

export default App;
