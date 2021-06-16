import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink, Link, Nav, useHistory } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();

  const signupFunc = async (e) => {
    e.preventDefault();
    //use nginx to redirect to right endpoint
    await axios
      .post("/api/signup", {
        email: email,
        password: password,
        firstname: fname,
        lastname: lname,
        telephone: number,
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data) {
          if (resp.data.flag == 0) {
            history.push("/login");
          } else if (resp.data.message) {
            setMessage(resp.data.message);
          }
        }
      })
      .catch((err) => {
        // Handle Error Here
        console.error(err);
      });
  };

  return (
    <div id='container'>
      <div class='form-wrap'>
        <h1>Sign Up</h1>
        <p>All your accomodation needs are just this form away!</p>

        <form name='Registration Form' onsubmit='return Validation()'>
          <div class='form-group'>
            <label htmlFor='first-name'>First Name</label>
            <input
              type='text'
              name='firstName'
              id='first-name'
              onChange={(e) => {
                setFname(e.target.value);
              }}
            />
          </div>

          <div class='form-group'>
            <label htmlFor='last-name'>Last Name</label>
            <input
              type='text'
              name='lastName'
              id='last-name'
              onChange={(e) => {
                setLname(e.target.value);
              }}
            />
          </div>

          <div class='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div class='form-group'>
            <label htmlFor='telephone'>Contact Info</label>
            <input
              type='telephone'
              name='telephone'
              id='telephone'
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
          </div>

          <div class='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <Button onClick={signupFunc}>Sign Up</Button>
          <strong>
            <p style={{ color: "red" }}>{message}</p>
          </strong>
        </form>
      </div>
      <footer>
        <p>
          Already have an account? <NavLink to='/login'>Login</NavLink>
        </p>
      </footer>
    </div>
  );
};

export default Signup;
