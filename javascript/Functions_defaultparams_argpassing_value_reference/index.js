"use strict";

const flight = "LG234";
const peter = {
  name: "Peter Telek",
  passport: 31587498127341,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LG999";
  passenger.name = "Mr." + passenger.name;

  if (passenger.passport === 31587498127341) alert("Checked in!");
  else alert("Wrong passport number");
};

// checkIn(flight, peter);
// console.log(flight);
// console.log(peter);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

// 2 functions manipulating the same object. BE AWARE!
newPassport(peter);
checkIn(flight, peter);

//////////////////////////////////////////////////////////////////////
// DEFAULT PARAMETERS

// const bookings = [];

// const createBooking = function (
//   flightNum,
//   passengerNum = 12,
//   price = 900 * passengerNum
// ) {
//   // ES5 old version
//   //   passengerNum = passengerNum || 1;
//   //   price = price || 900;

//   const booking = {
//     flightNum,
//     passengerNum,
//     price,
//   };
//   bookings.push(booking);
//   console.log(booking);
// };

// createBooking("ABS992", undefined, 700); // With this we can skip the middle parameter assign
