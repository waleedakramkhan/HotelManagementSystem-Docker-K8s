import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink, Nav, Link, useHistory } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

const Checkin = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [value, setValue] = useState();
  const [booking, setBooking] = useState();
  const [room, setRoom] = useState();
  const [message, setMessage] = useState("");

  const history = useHistory();

  useEffect(async () => {
    await axios.get("/api/roomtypes").then((response) => {
      if (response.data) {
        setRoomTypes(response.data);
      }
      console.log(roomTypes);
    });
  }, []);

  const checkinFunc = async (e) => {
    e.preventDefault();
    //use nginx to redirect to right endpoint
    await axios
      .post("/api/checkin", {
        booking: booking,
        roomtype: value?.roomID,
        roomID: room,
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data) {
          if (resp.data.flag == -1) {
            history.push("/login");
          } else if (resp.data.flag == 1 || resp.data.flag == 0) {
            setMessage(resp.data.message);
          }
        }
      })
      .catch((err) => {
        // Handle Error Here
        console.error(err);
      });
  };

  let options = roomTypes.map((roomtype) => {
    return { value: roomtype, label: roomtype.roomDescription };
  });

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      //   console.log({ data, isDisabled, isFocused, isSelected });
      return {
        ...styles,
        backgroundColor: isFocused ? "#999999" : null,
        color: "#333333",
      };
    },
  };

  const onChange = (option) => {
    setValue(option.value);
    console.log(option.value);
  };

  const logoutFunc = async (e) => {
    await axios.post("/api/logout").then((resp) => {
      if (resp.data) {
        history.push("/login");
      }
    });
  };

  return (
    <div id='container'>
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
                  <NavLink to='/home'>Home</NavLink>
                </li>
                <li class='menu-active'>
                  <NavLink to='/bookroom'>Book Room</NavLink>
                </li>
                <li class='menu-active'>
                  <NavLink to='/checkout'>Check Out</NavLink>
                </li>
                <li class='menu-active'>
                  <NavLink to='/review'>Review</NavLink>
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
      </div>
      <div class='form-wrap'>
        <h1>Check In</h1>
        <p>Welcome to the Premises! Check In below</p>

        <form name='Login Form'>
          <div class='form-group'>
            <label for='booking'>Booking Number</label>
            <input
              type='number'
              name='booking'
              id='booking'
              onChange={(e) => {
                setBooking(e.target.value);
              }}
            />
          </div>

          <div class='form-group'>
            <label for='roomNumber'>Room Number</label>
            <input
              type='number'
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            ></input>
          </div>

          <div class='form-group'>
            <label for='roomtype'>Your Selected Room Type</label>
            {/* <select style={{ width: "290px" }} name='roomtype' id='roomtype'>
              <option>Select the Room Type you Booked</option>
              <option>Single</option>
              <option>Double</option>
              <option>Luxury:Single</option>
              <option>Luxury:Couple</option>
              <option>Villa</option>
              <option>Suite</option>
            </select> */}
            <Select
              isSearchable={false}
              options={options}
              defaultValue={roomTypes[1]}
              label='Select the Room Type you Booked'
              styles={colourStyles}
              onChange={onChange}
            />
            {/* <select>
              {roomTypes.map((roomtype) => {
                <option>{roomtype.roomDescription}</option>;
              })}
            </select> */}
          </div>

          <button type='submit' onClick={checkinFunc} class='btn'>
            <strong>Check In</strong>
          </button>
          <strong>
            <p style={{ color: "red" }}>{message}</p>
          </strong>
        </form>
      </div>
    </div>
  );
};

export default Checkin;
