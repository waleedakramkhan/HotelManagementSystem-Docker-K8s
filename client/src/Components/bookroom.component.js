import React, { useEffect, useState } from "react";
import { NavLink, Nav, Link, useHistory } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

const Bookroom = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [value, setValue] = useState();
  const [email, setEmail] = useState();
  const [checkin, setCheckin] = useState();
  const [checkout, setCheckout] = useState();
  const [hotel, setHotel] = useState();
  const [room, setRoom] = useState();
  const [message, setMessage] = useState("");
  const [id, setId] = useState(-1);
  const history = useHistory();

  useEffect(async () => {
    await axios.get("/api/roomtypes").then((response) => {
      if (response.data) {
        setRoomTypes(response.data);
      }
      // console.log(roomTypes);
    });
  }, []);

  const bookingFunc = async (e) => {
    e.preventDefault();
    //use nginx to redirect to right endpoint
    await axios
      .post("/api/bookroom", {
        email: email,
        roomtype: value?.roomID,
        checkin: checkin,
        checkout: checkout,
        hotelID: hotel,
        roomID: room,
      })
      .then((resp) => {
        // console.log(resp.data);
        if (resp.data) {
          if (resp.data.flag == -1) {
            history.push("/login");
          } else if (resp.data.flag == 1 || resp.data.flag == 0) {
            setMessage(resp.data.message);
            setId(resp.data.bookingID["LAST_INSERT_ID()"]);
            // console.log(resp.data.bookingID["LAST_INSERT_ID()"]);
          } else if (resp.data.flag == 2) {
            setMessage("Room or hotel not available!");
          }
        }
      })
      .catch((err) => {
        // Handle Error Here
        console.error(err);
      });
  };

  const logoutFunc = async (e) => {
    await axios.post("/api/logout").then((resp) => {
      if (resp.data) {
        history.push("/login");
      }
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
    // console.log(option.value);
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
                  <NavLink to='/checkin'>Check In</NavLink>
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
        <h1>Book your Room Now</h1>
        <p>Complete your Booking below!</p>

        <form name='Booking rooms' onsubmit='return Validation()'>
          <div class='form-group'>
            <label for='email'>Email</label>
            <input
              type='text'
              name='userEmail'
              id='userEmail'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div class='form-group'>
            <label for='checkIN'>Check In Date</label>
            <input
              type='date'
              name='checkinDate'
              id='CheckIndate'
              onChange={(e) => {
                setCheckin(e.target.value);
              }}
            />
          </div>

          <div class='form-group'>
            <label for='checkout'>Check Out Date</label>
            <input
              type='date'
              name='checkOuDate'
              id='CheckOutdate'
              onChange={(e) => {
                setCheckout(e.target.value);
              }}
            />
          </div>
          <div class='form-group'>
            <label for='roomID'>Room ID</label>
            <input
              type='number'
              name='roomID'
              id='roomID'
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <div class='form-group'>
            <label for='hotelID'>Hotel ID</label>
            <input
              type='number'
              name='hotelID'
              id='hotelID'
              onChange={(e) => {
                setHotel(e.target.value);
              }}
            />
          </div>

          {/* <div class='form-group'>
            <label for='roomtype'>Room Type</label>
            <select name='roomtype' id='roomtype'>
              <option>Specifics about the Room you're interested in</option>
              <option>Single</option>
              <option>Double</option>
              <option>Luxury:Single</option>
              <option>Luxury:Couple</option>
              <option>Villa</option>
              <option>Suite</option>
            </select>
          </div> */}
          <div class='form-group'>
            <label for='roomtype'>Room Type</label>

            <Select
              isSearchable={false}
              options={options}
              defaultValue={roomTypes[1]}
              label='Select the Room Type you Booked'
              styles={colourStyles}
              onChange={onChange}
            />
          </div>
          <button onClick={bookingFunc} class='btn'>
            <strong>Complete Booking</strong>
          </button>
          <strong>
            <p style={{ color: "red" }}>{message}</p>
          </strong>
          {id != -1 ? (
            <strong>
              <p style={{ color: "red" }}>Your booking ID is {id}</p>
            </strong>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Bookroom;
