"use strict";

const converter = function (data) {
  for (const [i, entry] of data.entries()) {
    const trimmedData = entry.toLowerCase().trim();
    const [firstWord, secondWord] = trimmedData.split("_");
    const secondUpper = secondWord.replace(
      secondWord[0],
      secondWord[0].toUpperCase()
    );
    const word = firstWord + secondUpper;
    const paddedWord = word.padEnd(20, " ");
    const finalWord = paddedWord + "✅".repeat(i + 1);

    console.log(finalWord);
  }
};

document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

document.querySelector("button").addEventListener("click", function () {
  const text = document.querySelector("textarea").value;
  const rows = text.split("\n");
  converter(rows);
});

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅


*/

const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const flightFormatter = function (data) {
  const arrayData = data.split("+");
  for (const flightSegment of arrayData) {
    const segments = flightSegment.split(";");
    console.log(segments);
  }
  console.log(arrayData);
};

flightFormatter(flights);

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)
