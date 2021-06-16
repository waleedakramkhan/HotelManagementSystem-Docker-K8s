import React, { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink, Nav, Link, useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const loginFunc = async (e) => {
    e.preventDefault();
    console.log(email, password);
    //use nginx to redirect to right endpoint
    await axios
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data) {
          if (resp.data.message) {
            setMessage(resp.data.message);
          } else {
            history.push("/home");
          }
        }
      })
      .catch((err) => {
        // Handle Error Here
        console.error(err);
      });
  };

  return (
    <div className='body'>
      <div id='container'>
        <div className='form-wrap'>
          <h1>Log In</h1>
          <p>Welcome back! Log in below</p>

          <form name='Login Form'>
            <div className='form-group'>
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

            <div className='form-group'>
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

            <button type='submit' className='btn' onClick={loginFunc}>
              <strong>
                <p>Log In</p>
              </strong>
            </button>
            <strong>
              <p style={{ color: "red" }}>{message}</p>
            </strong>
          </form>
        </div>
        <footer>
          <p>
            Don't have an account? <NavLink to='/signup'>Sign Up</NavLink>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
