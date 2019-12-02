import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './Components/Navbar/Nav';
import LandingPage from './Components/Home/LandingPage';
import MotorcyclePage from './Components/Motorcycle/MotorcyclePage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="container">

          <Switch>

            <Route path="/motorcycle" component={MotorcyclePage} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
