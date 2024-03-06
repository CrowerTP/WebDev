"use strict";

const oneWord = function (str) {
  return str.replaceAll(" ", "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstWord, ...others] = str.split(" ");
  return [firstWord.toUpperCase(), ...others].join(" ");
};

// Higher order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer("JavaSCript is the best", upperFirstWord);
transformer("JavaSCript is the best", oneWord);

// JS uses callback all the time
const sayHello = function () {
  console.log(`🖐`);
};

document.body.addEventListener("click", sayHello);
