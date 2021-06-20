create database hoteldb;
use hoteldb;
CREATE TABLE Users (
	userID INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR
(50),
	fName VARCHAR
(20),
	lName VARCHAR
(20),
	PhoneNo VARCHAR
(20),
	pass VARCHAR
(20)
);

CREATE TABLE Hotels (
	hotelID INT PRIMARY KEY AUTO_INCREMENT,
	city VARCHAR
(15),
	hotelName VARCHAR
(50),
	email VARCHAR
(50),
	hotelAddress VARCHAR
(50)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE Reviews
(
	hotelID INT,
	FOREIGN KEY (hotelID) REFERENCES Hotels(hotelID) ON DELETE CASCADE ON UPDATE NO ACTION,
	reviewText VARCHAR(250),
	userID INT,
	FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE NO ACTION ON UPDATE NO ACTION,
	rating INT CHECK (rating >= 1 AND rating <= 5),
	PRIMARY KEY(userID, hotelID)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE RoomType
(
	roomID INT PRIMARY KEY,
	roomDescription VARCHAR(50)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE Rooms (
	roomID INT PRIMARY KEY AUTO_INCREMENT,
	hotelID INT,
    FOREIGN KEY
(hotelID) REFERENCES Hotels
(hotelID) ON
DELETE CASCADE ON
UPDATE NO ACTION,
	roomType INT, 
    FOREIGN KEY
(roomType) REFERENCES RoomType
(roomID) ON
DELETE
SET NULL
ON
UPDATE NO ACTION
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE RoomStatus
(
	roomID INT PRIMARY KEY,
	FOREIGN KEY (roomID) REFERENCES Rooms(roomID),
	roomStatus VARCHAR(20)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE Booking (
	entryID INT PRIMARY KEY AUTO_INCREMENT,
	bookedby INT,
    FOREIGN KEY
(bookedby) REFERENCES Users
(userID) ON
DELETE NO ACTION ON
UPDATE NO ACTION,
	checkInDate DATE,
	checkOutDate DATE,
	hotelID INT,
    FOREIGN KEY
(hotelID) REFERENCES Hotels
(hotelID) ON
DELETE NO ACTION ON
UPDATE NO ACTION,
	roomID INT, 
    FOREIGN KEY
(roomID) REFERENCES Rooms
(RoomID) ON
DELETE CASCADE ON
UPDATE NO ACTION
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY

INSERT INTO Users
VALUES
	(1, 'fawad@gmail.com', 'Abdullah', 'Fawad', '03244488726', 'bulbasaur');
INSERT INTO Users
	(email,fName,lName,PhoneNo, pass)
VALUES
	('hasan@gmail.com', 'Hasan', 'Ahmed', '03244488726', 'squirtle');
INSERT INTO Users
	(email,fName,lName,PhoneNo, pass)
VALUES
	('saleem@gmail.com', 'Danial', 'Saleem', '03244488726', 'charmander');

INSERT INTO Hotels
	(city,hotelName,email,hotelAddress)
VALUES
	('Lahore', 'Shaaaaa', 'shaaaaa@gmail.com', '45 Street 7');
INSERT INTO Hotels
	(city,hotelName,email,hotelAddress)
VALUES
	('Islamabad', 'Treee', 'treee@gmail.com', '55 Street 33');
INSERT INTO Hotels
	(city,hotelName,email,hotelAddress)
VALUES
	('Lahore', 'Blekh', 'blekh@gmail.com', '121 Street 6');

INSERT INTO RoomType
VALUES
	(1, 'Simple; Single Occupancy');
INSERT INTO RoomType
VALUES
	(2, 'Simple; Double Occupancy');
INSERT INTO RoomType
VALUES
	(3, 'Luxury; Single Occupancy');
INSERT INTO RoomType
VALUES
	(4, 'Luxury; Double Occupancy');
INSERT INTO RoomType
VALUES
	(5, 'Suite');
INSERT INTO RoomType
VALUES
	(6, 'Villa');

INSERT INTO Rooms
	(hotelID,roomType)
VALUES
	(2, 6);
INSERT INTO Rooms
	(hotelID,roomType)
VALUES
	(2, 4);
INSERT INTO Rooms
	(hotelID,roomType)
VALUES
	(1, 3);
INSERT INTO Rooms
	(hotelID,roomType)
VALUES
	(2, 2);
INSERT INTO Rooms
	(hotelID,roomType)
VALUES
	(3, 3);
INSERT INTO Rooms
	(hotelID,roomType)
VALUES
	(3, 5);
INSERT INTO Rooms
	(hotelID,roomType)
VALUES
	(2, 1);

INSERT INTO Reviews
VALUES
	(2, 'Great experience', 2, 4);
INSERT INTO Reviews
VALUES
	(3, 'Fantastic time spent at the hotel.', 2, 5);
INSERT INTO Reviews
VALUES
	(1, 'Great experience', 3, 4);
-- INSERT INTO Reviews VALUES (3, 'Enjoyed my stay a lot.', 1, 5);
-- INSERT INTO Reviews VALUES (2, 'Mediocre experience', 1, 3);
INSERT INTO Reviews
VALUES
	(3, 'Poor experience', 3, 1);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
SELECT *
FROM Users;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
SELECT *
FROM Hotels;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
SELECT *
FROM Reviews;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
SELECT *
FROM RoomType;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
SELECT *
FROM Rooms;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
SELECT *
FROM Booking;

