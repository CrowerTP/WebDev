"use strict";

const flight = "LG234";
const peter = {
  name: "Peter",
  passport: 31587498127341,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LG999";
};

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
