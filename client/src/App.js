import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Components/login.component";
import SignUp from "./Components/signup.component";
import BookRoom from "./Components/bookroom.component";
import CheckIn from "./Components/checkin.component";
import CheckOut from "./Components/checkout.component";
import AddReview from "./Components/review.component";
import LandingPage from "./Components/landing.component";

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='auth-wrapper'>
          <div className='auth-inner'>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={SignUp} />
              <Route path='/bookroom' component={BookRoom} />
              <Route path='/review' component={AddReview} />
              <Route path='/checkin' component={CheckIn} />
              <Route path='/checkout' component={CheckOut} />
              <Route path='/home' component={LandingPage} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
