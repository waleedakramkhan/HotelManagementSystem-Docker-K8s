import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { NavLink, Nav, Link, useHistory } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

const Review = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [value, setValue] = useState();
  const [booking, setBooking] = useState();
  const [rating, setRating] = useState();
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();

  useEffect(async () => {
    await axios.get("/api/roomtypes").then((response) => {
      if (response.data) {
        setRoomTypes(response.data);
      }
      // console.log(roomTypes);
    });
  }, []);

  const reviewFunc = async (e) => {
    e.preventDefault();
    //use nginx to redirect to right endpoint
    await axios
      .post("/api/review", {
        booking: booking,
        roomtype: value?.roomID,
        rating: rating,
        text: text,
      })
      .then((resp) => {
        // console.log(resp.data);
        if (resp.data) {
          if (resp.data.flag == -1) {
            history.push("/login");
          } else if (resp.data.flag == 1 || resp.data.flag == 0) {
            setMessage(resp.data.message);
          } else if (resp.data.flag == 2) {
            if (resp.data.err.errno == 1062) {
              setMessage("You have already posted a review for this hotel!");
            }
          }
        }
      })
      .catch((err) => {
        // Handle Error Here
        console.error(err);
        // console.log(err.err);
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
                  <NavLink to='/checkin'>Check In</NavLink>
                </li>
                <li class='menu-active'>
                  <NavLink to='/checkout'>Check Out</NavLink>
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
        <h1>Write a Review</h1>
        <p>
          Stayed at a Hotel through Hotel Haven? We'd love to hear from you!
        </p>

        <form name='Review' onsubmit='return Validation()'>
          <div class='form-group'>
            <label for='hName'>Booking Number</label>
            <input
              type='text'
              name='hName'
              id='hName'
              onChange={(e) => {
                setBooking(e.target.value);
              }}
            />
          </div>

          {/* <div class='form-group'>
            <label for='roomtype' placeholder='Rooms you Stayed at'>
              Room Type
            </label>
            <select name='roomtype' id='roomtype'>
              <option>Rooms you Stayed at</option>
              <option>Single</option>
              <option>Double</option>
              <option>Luxury:Single</option>
              <option>Luxury:Couple</option>
              <option>Villa</option>
              <option>Suite</option>
            </select>
          </div> */}
          <div class='form-group'>
            <label for='roomtype'>Room type you stayed at</label>

            <Select
              isSearchable={false}
              options={options}
              defaultValue={roomTypes[1]}
              label='Select the Room Type you Booked'
              styles={colourStyles}
              onChange={onChange}
            />
          </div>

          <div class='rate'>
            <label for='rating'>
              How would you rate your Experience?
              <br />
            </label>
            <div>
              <input
                type='radio'
                id='star1'
                name='rate'
                value='1'
                onClick={(e) => {
                  setRating(1);
                }}
              />
              <label for='star1' title='text'>
                1
              </label>
              <input
                type='radio'
                id='star2'
                name='rate'
                value='2'
                onClick={(e) => {
                  setRating(2);
                }}
              />
              <label for='star2' title='text'>
                2
              </label>
              <input
                type='radio'
                id='star3'
                name='rate'
                value='3'
                onClick={(e) => {
                  setRating(3);
                }}
              />
              <label for='star3' title='text'>
                3
              </label>
              <input
                type='radio'
                id='star4'
                name='rate'
                value='4'
                onClick={(e) => {
                  setRating(4);
                }}
              />
              <label for='star4' title='text'>
                4
              </label>
              <input
                type='radio'
                id='star5'
                name='rate'
                value='5'
                onClick={(e) => {
                  setRating(5);
                }}
              />
              <label for='star5' title='text'>
                5
              </label>
            </div>
          </div>

          <div class='form-group'>
            <label for='review'>Describe your Experience</label>
            <textarea
              type='review'
              name='review'
              id='review'
              cols='40'
              rows='7'
              style={{ borderRadius: "5px" }}
              placeholder="How'd it go?"
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
          </div>

          <button onClick={reviewFunc} type='submit' class='btn'>
            <strong>Post Review</strong>
          </button>
          <strong>
            <p style={{ color: "red" }}>{message}</p>
          </strong>
        </form>
      </div>
    </div>
  );
};

export default Review;
