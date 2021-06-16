import React from "react";
import { Link } from "react-scroll";
import { Button } from "react-bootstrap";
import { NavLink, Nav, useHistory } from "react-router-dom";
import axios from "axios";

const Landingpage = () => {
  const history = useHistory();
  const logoutFunc = async (e) => {
    await axios.post("/api/logout").then((resp) => {
      if (resp.data) {
        history.push("/login");
      }
    });
  };

  return (
    <div id='landingpage'>
      <header id='header'>
        <div className='container'>
          <div id='logo' class='pull-left'>
            <h1>
              <NavLink to='#'>Hotel Management System</NavLink>
            </h1>
          </div>

          <nav id='nav-menu-container'>
            <ul class='nav-menu'>
              <li class='menu-active'>
                <NavLink to='/'>Home</NavLink>
              </li>
              <li>
                <Link
                  to='services'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                >
                  Services
                </Link>
              </li>

              <li class='menu-active'>
                <button
                  style={{
                    backgroundColor: "#5dade2",
                    borderRadius: "3px",
                    borderWidth: "0px",
                    padding: "2px",
                    color: "#fff",
                    fontSize: "13px",
                  }}
                  onClick={logoutFunc}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section id='hero'>
        <div class='hero-container'>
          <h1>Welcome to the Hotel Managament System</h1>
          <h2>
            We provide a centralized system for all your accomodation needs on
            vacations and trips!
          </h2>
        </div>
      </section>

      <main id='main'>
        <section id='services'>
          <div class='container wow fadeIn'>
            <div class='section-header'>
              <h3 class='section-title'>Services</h3>
              <p class='section-description'></p>
            </div>

            <div class='row'>
              <div class='col-lg-4 col-md-6 wow fadeInUp' data-wow-delay='0.2s'>
                <div class='box'>
                  <div class='icon'>
                    <NavLink to='/checkin'>
                      <i class='fa fa-desktop'></i>
                    </NavLink>
                  </div>
                  <h4 class='title'>
                    <NavLink to='/checkin'>Check In</NavLink>
                  </h4>
                  <p class='description'>
                    Are you on the premises? Check in Here.
                  </p>
                </div>
              </div>

              <div class='col-lg-4 col-md-6 wow fadeInUp' data-wow-delay='0.2s'>
                <div class='box'>
                  <div class='icon'>
                    <NavLink to='/checkout'>
                      <i class='fa fa-bar-chart'></i>
                    </NavLink>
                  </div>
                  <h4 class='title'>
                    <NavLink to='/checkout'>Check Out</NavLink>
                  </h4>
                  <p class='description'>Finished your stay? Check out here.</p>
                </div>
              </div>

              <div class='col-lg-4 col-md-6 wow fadeInUp' data-wow-delay='0.2s'>
                <div class='box'>
                  <div class='icon'>
                    <NavLink to='/bookroom'>
                      <i class='fa fa-paper-plane'></i>
                    </NavLink>
                  </div>
                  <h4 class='title'>
                    <NavLink to='/bookroom'>Book Room</NavLink>
                  </h4>
                  <p class='description'>Complete your Booking here!</p>
                </div>
              </div>

              <div class='col-lg-4 col-md-6 wow fadeInUp' data-wow-delay='0.2s'>
                <div class='box'>
                  <div class='icon'>
                    <NavLink to='/review'>
                      <i class='fa fa-paper-plane'></i>
                    </NavLink>
                  </div>
                  <h4 class='title'>
                    <NavLink to='/review'>Add a Review</NavLink>
                  </h4>
                  <p class='description'>
                    Stayed at a Hotel through us? We'd love to hear from you!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id='footer'>
        <div class='footer-top'>
          <div class='container'></div>
        </div>

        <div class='container'>
          <div class='copyright'>
            &copy; Copyright <strong>Hotel Management System</strong>. All
            Rights Reserved
          </div>
          <div class='credits'>
            Designed by <strong>Waleed Akram Khan and Abdullah Fawad</strong>
          </div>
        </div>
      </footer>

      <NavLink to='/#' class='back-to-top'>
        <i class='fa fa-chevron-up'></i>
      </NavLink>
      <script src='lib/jquery/jquery.min.js'></script>
      <script src='lib/jquery/jquery-migrate.min.js'></script>
      <script src='lib/bootstrap/js/bootstrap.bundle.min.js'></script>
      <script src='lib/easing/easing.min.js'></script>
      <script src='lib/wow/wow.min.js'></script>
      <script src='lib/waypoints/waypoints.min.js'></script>
      <script src='lib/counterup/counterup.min.js'></script>
      <script src='lib/superfish/hoverIntent.js'></script>
      <script src='lib/superfish/superfish.min.js'></script>
      <script src='contactform/contactform.js'></script>
      <script src='js/main.js'></script>
    </div>
  );
};

export default Landingpage;
