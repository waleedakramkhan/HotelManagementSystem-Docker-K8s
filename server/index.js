const keys = require("./keys");

//Express Application Setup

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "It's a SECRETTTTTT!@!@$E@!#E@Q",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 365 * 1000,
    },
  })
);

var USER_SESS = null;
//MySQL client setup

// const mysql = require("mysql");
const mysql = require("mysql2");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: keys.sqlHost,
  user: keys.sqlUser,
  password: keys.sqlPassword,
  database: keys.sqlDatabase,
});

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "deathstar",
//   database: "hoteldb",
// });

pool.on("connection", (connection) => {
  console.log("Connection to db made!");
});

app.get("/", (req, res) => {
  //   res.send("YOOOO");
  const sqlQuery =
    "INSERT INTO Hotels (city,hotelName,email,hotelAddress) VALUES ('Lahore', 'Blekh', 'blekh@gmail.com', '121 Street 6')";
  pool.query(sqlQuery, (err, result) => {
    res.send("YOOOO");
  });
});

//signup api endpoint
app.post("/signup", (req, res) => {
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const telephone = req.body.telephone;
  const password = req.body.password;
  const sqlQueryCheck = "SELECT * FROM Users WHERE email=?";
  pool.query(sqlQueryCheck, [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length === 0) {
      const sqlQueryInsert =
        "insert into Users (email, fName, lName, PhoneNo, pass) values (?, ?, ?, ?, ?)";
      pool.query(
        sqlQueryInsert,
        [email, firstname, lastname, telephone, password],
        (err, result) => {
          if (err) {
            res.send({ err: err, flag: 2 });
          }
          res.send({ message: "User added successfully!", flag: 0 });
        }
      );
    } else {
      res.send({ message: "User already exists!", flag: 1 });
    }
  });
});

//login api endpoint
app.post("/login", (req, res) => {
  // res.send({
  //   connectionLimit: 10,
  //   host: keys.sqlHost,
  //   user: keys.sqlUser,
  //   password: keys.sqlPassword,
  //   database: keys.sqlDatabase,
  // });
  const email = req.body.email;
  const password = req.body.password;
  const sqlQuery = "select * from Users where email = ? AND pass = ?";
  console.log(email, password, "yoo");
  pool.query(sqlQuery, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ err: err, flag: 2 });
    } else {
      console.log("query called", result);
      if (result) {
        if (result.length > 0) {
          USER_SESS = result[0];
          req.session.user = result[0];
          req.session.views = 1;
          req.session.save(() => {
            console.log(req.session);
            res.send({ result: result, flag: 0 });
          });
        } else {
          res.send({ message: "Incorrect username or password", flag: 1 });
        }
      }
    }
  });
});

//endpoints for room booking form
//room type api endpoint
app.get("/roomtypes", (req, res) => {
  const sqlQuery = "SELECT * FROM RoomType";
  pool.query(sqlQuery, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ message: "No room types available right now" });
    }
  });
});

//available room api endpoint
app.get("/rooms", (req, res) => {
  const type = req.query.roomtype;
  const sqlQuery = `select * from Rooms inner join RoomStatus on Rooms.roomID = RoomStatus.roomID where RoomStatus.roomStatus like 'free' and Rooms.roomType=${type}`;
  pool.query(sqlQuery, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ message: "No free rooms available right now" });
    }
  });
});

//room booking api endpoint
app.post("/bookroom", (req, res) => {
  if (USER_SESS == null) {
    res.send({ message: "FATAL LOGIN", flag: -1 });
  } else {
    var moment = require("moment");

    const email = req.body.email;
    const checkin = req.body.checkin;
    const checkout = req.body.checkout;
    const roomID = req.body.roomID;
    const hotelID = req.body.hotelID;
    const sqlQuery1 = "select * from Users where email=?";
    const sqlQuery2 =
      "insert into Booking (bookedBy, checkInDate, checkOutDate, hotelID, roomID) values (?, ?, ?, ?, ?)";
    const sqlQuery3 =
      "UPDATE RoomStatus SET roomStatus = 'reserved' WHERE roomID = ?";

    pool.query(sqlQuery1, [email], (err, result) => {
      if (err) {
        res.send({ err: err, flag: 2 });
      }
      // console.log(result);
      else {
        if (result.length > 0) {
          pool.query(
            sqlQuery2,
            [
              result[0].userID,
              moment(checkin).format("YYYY-MM-DD"),
              moment(checkout).format("YYYY-MM-DD"),
              hotelID,
              roomID,
            ],
            (err, result) => {
              if (err) {
                res.send({ err: err, flag: 2 });
              } else {
                pool.query(sqlQuery3, [roomID], (err, result) => {
                  if (err) {
                    res.send({ err: err, flag: 2 });
                  } else {
                    console.log(result);
                    pool.query("SELECT LAST_INSERT_ID()", (err, result) => {
                      if (err) {
                        res.send({ err: err, flag: 2 });
                      } else {
                        console.log(result);
                        let bid = res.send({
                          message: "Room  booked successfully!",
                          flag: 0,
                          bookingID: result[0],
                        });
                      }
                    });
                  }
                });
              }
            }
          );
        } else {
          res.send({ message: "Email id not correct", flag: 1 });
        }
      }
    });
  }
});

//endpoints for posting a review
//post review api endpoint
app.post("/review", (req, res) => {
  if (USER_SESS == null) {
    res.send({ message: "FATAL LOGIN", flag: -1 });
  } else {
    const booking = req.body.booking;
    const roomtype = req.body.roomtype;
    const rating = req.body.rating;
    const text = req.body.text;
    sqlQuery1 = "SELECT * FROM Booking WHERE entryID = ?";
    sqlQuery2 =
      "INSERT INTO Reviews (hotelID,reviewText,userID,rating) VALUES (?, ?, ?, ?)";

    pool.query(sqlQuery1, [booking], (err, result) => {
      if (err) {
        res.send({ err: err, flag: 2 });
      }
      // console.log(result);
      else {
        if (result.length > 0) {
          const userID = USER_SESS.userID;
          const hotelID = result[0].hotelID;
          // console.log(userID, result[0].bookedby);
          if (userID != result[0].bookedby) {
            res.send({ message: "This is not your booking!", flag: 1 });
          } else {
            pool.query(
              sqlQuery2,
              [hotelID, text, userID, rating],
              (err, result) => {
                if (err) {
                  res.send({ err: err, flag: 2 });
                } else {
                  res.send({ message: "Review posted successfully!", flag: 0 });
                }
              }
            );
          }
        } else {
          res.send({ message: "No booking found!", flag: 1 });
        }
      }
    });
  }
});

//endpoints for checking out
//checkout api endpoint
app.post("/checkout", (req, res) => {
  if (USER_SESS == null) {
    res.send({ message: "FATAL LOGIN", flag: -1 });
  } else {
    const booking = req.body.booking;
    const roomtype = req.body.roomtype;
    const roomID = req.body.roomID;
    sqlQuery1 =
      "SELECT * FROM Booking inner join Rooms on Booking.roomID = Rooms.roomID inner join RoomType on RoomType.roomID = Rooms.roomType  WHERE entryID = ? AND Booking.roomID = ? AND RoomType.roomID = ?";
    sqlQuery2 = "UPDATE Booking SET checkOutDate = ? WHERE roomID = ?";
    const sqlQuery3 =
      "UPDATE RoomStatus SET roomStatus = 'free' WHERE roomID = ?";
    pool.query(sqlQuery1, [booking, roomID, roomtype], (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      // console.log(result);
      if (result) {
        if (result && result.length > 0) {
          const userID = USER_SESS.userID;
          const hotelID = result[0].hotelID;
          //   console.log(userID, result[0].bookedby);
          if (userID != result[0].bookedby) {
            res.send({ message: "This is not your booking!", flag: 1 });
          } else {
            var moment = require("moment");
            pool.query(
              sqlQuery2,
              [moment(new Date()).format("YYYY-MM-DD"), roomID],
              (err, result) => {
                if (err) {
                  res.send({ err: err, flag: 2 });
                } else {
                  pool.query(sqlQuery3, [roomID], (err, result) => {
                    if (err) {
                      res.send({ err: err, flag: 2 });
                    } else {
                      res.send({
                        message: "Checked out successfully!",
                        flag: 0,
                      });
                    }
                  });
                }
              }
            );
          }
        } else {
          res.send({ message: "No booking found!", flag: 1 });
        }
      }
    });
  }
});

//endpoints for checking in
//checkin api endpoint
app.post("/checkin", (req, res) => {
  console.log(req.session);
  if (USER_SESS == null) {
    res.send({ message: "FATAL LOGIN", flag: -1 });
  } else {
    const booking = req.body.booking;
    const roomtype = req.body.roomtype;
    const roomID = req.body.roomID;
    sqlQuery1 =
      "SELECT * FROM Booking inner join Rooms on Booking.roomID = Rooms.roomID inner join RoomType on RoomType.roomID = Rooms.roomType  WHERE entryID = ? AND Booking.roomID = ? AND RoomType.roomID = ?";
    sqlQuery2 = "UPDATE Booking SET checkInDate = ? WHERE roomID = ?";
    const sqlQuery3 =
      "UPDATE RoomStatus SET roomStatus = 'occupied' WHERE roomID = ?";
    pool.query(sqlQuery1, [booking, roomID, roomtype], (err, result) => {
      if (err) {
        res.send({ err: err, flag: 2 });
      }
      // console.log(result);
      if (result) {
        if (result && result.length > 0) {
          const userID = USER_SESS.userID;
          const hotelID = result[0].hotelID;
          //   console.log(userID, result[0].bookedby);
          if (userID != result[0].bookedby) {
            res.send({ message: "This is not your booking!", flag: 1 });
          } else {
            var moment = require("moment");
            pool.query(
              sqlQuery2,
              [moment(new Date()).format("YYYY-MM-DD"), roomID],
              (err, result) => {
                if (err) {
                  res.send({ err: err, flag: 2 });
                } else {
                  pool.query(sqlQuery3, [roomID], (err, result) => {
                    if (err) {
                      res.send({ err: err, flag: 2 });
                    } else {
                      res.send({
                        message: "Checked in successfully!",
                        flag: 0,
                      });
                    }
                  });
                }
              }
            );
          }
        } else {
          res.send({ message: "No booking found!", flag: 1 });
        }
      }
    });
  }
});

app.post("/logout", (req, res) => {
  if (USER_SESS == null) {
    res.send({ message: "FATAL LOGIN", flag: -1 });
  } else {
    USER_SESS = null;
    res.send({ message: "Logout successul!", flag: 0 });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
