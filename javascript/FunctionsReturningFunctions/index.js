"use strict";

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

const greet = (greeting) => (name) => console.log(`${greeting} ${name}`);

const sayHello = greet("Hello");
sayHello("Peter");
sayHello("Steve");

greet("Hello")("Peter");
