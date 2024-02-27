"use strict";

//Primitive types
// let age = 31;
// let oldAge = age;
// age = 32;
// console.log(age);
// console.log(oldAge);

// Reference types
// const me = {
//   name: "Peter",
//   age: 32,
// };
// const friend = me;
// friend.age = 27;
// console.log("Me:", me);
// console.log("Friend:", friend);  // Even though we changed only the friend.age value, it is stored in the HEAP and "friend" is pointing to the same object as "me".

// ---------- PRACTICE --------------

// Copying objects

const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
};

const jessicaCopy = Object.assign({}, jessica);
jessicaCopy.lastName = "Adams";

console.log(`Before Marriage: `, jessica);
console.log(`After Marriage: `, jessicaCopy);
