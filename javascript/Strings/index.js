"use strict";

const airline = "TAP Air Portugal";
const plane = "A320";

console.log(airline.indexOf("r")); // 6
console.log(airline.lastIndexOf("r")); // 10
console.log(airline.indexOf("Portugal")); // 8
console.log(airline.slice(4, 7)); // Air

console.log(airline.slice(0, airline.indexOf(" "))); // TAP
console.log(airline.slice(airline.lastIndexOf(" ") + 1)); // Portugal

console.log(airline.slice(-2)); // al
console.log(airline.slice(1, -1)); // AP Air Portuga

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  console.log(
    s === "B" || s === "E"
      ? `${seat} is a middle seat`
      : `${seat} is not a middle seat`
  );
};

checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("2E");
