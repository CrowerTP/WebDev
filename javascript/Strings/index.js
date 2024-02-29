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

console.log(new String("Peter")); // this is an object ( javascript make and object from a primitive string when a method is called on it )
console.log(typeof new String("Peter")); // object

console.log(typeof new String("Peter").slice(2)); // this is a string (primitive type)  ( javascript converts back the object into a primitive type when the method is done )
// this is called boxing

console.log(airline.toLowerCase()); // tap air portugal
console.log(airline.toUpperCase()); // TAP AIR PORTUGAL

// comparing email
const email = "t.pet@gmail.com";
const loginEmail = "   T.Pet@Gmail.Com";

// We can concatanate methods after each other
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing
const priceGB = "288,97£";
const priceUS = priceGB.replace("£", "$").replace(",", ".");
console.log(priceUS); // 288.97$

const annoucement =
  "All passengers come to boarding door 23. Boarding door 23!";

console.log(annoucement.replace("door", "gate")); // All passengers come to boarding gate 23. Boarding door 23!  // IT IS ONLY REPLACING THE FIRST OCCURENCE
console.log(annoucement.replaceAll("door", "gate")); // All passengers come to boarding gate 23. Boarding gate 23!

// Booleans
const plane2 = "A320neo";
console.log(plane2.includes("A320")); // true
console.log(plane2.startsWith("Air")); // false , if it was "Airbus A320neo" it would be true

if (plane2.startsWith("A") && plane2.endsWith("neo"))
  console.log("It is the part of the new Airbus family");

// Practice excercise
const checkBaggage = function (str) {
  const lowerStr = str.toLowerCase();
  if (lowerStr.includes("knife") || lowerStr.includes("gun"))
    console.log("You are not allowed to get on the plane");
  else console.log("You can get aboard");
};

checkBaggage("I have a laptop, some ood and a Pocket knife");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a Gun for protection");

// split
console.log("a+very+nice+string".split("+")); // array split by "+" character
const [firstName, lastName] = "Telek Péter".split(" ");
console.log(firstName, lastName);

const newName = ["Mr.", firstName, lastName].join(" ");
console.log(newName);

// capitalize Name
const capitalizeName = function (name) {
  const names = name.split(" ");
  const capNames = [];

  for (const n of names) {
    capNames.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(capNames.join(" "));
};

capitalizeName("jessica lawn johnson care");

// Padding
const message = "Go to gate 23";
console.log(message.padStart(25, "+").padEnd(35, "+"));
console.log("Peter".padStart(25, "+").padEnd(35, "+"));

// example
const maskCreditCard = function (number) {
  const str = number + "";
  console.log(str.slice(-4).padStart(str.length, "*"));
};

maskCreditCard(48486521894874986541n);

// Repeat
const message2 = "Bad weather... All Departures Delayed...";
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes waiting in line. ${"✈️".repeat(n)}`);
};

const planes = prompt("How many planes waiting in line?");
planesInLine(planes);
