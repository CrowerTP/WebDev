"use strict";

// Variables

// console.log(me);
// console.log(job);
// console.log(year);

var me = "Peter";
let job = "engineer";
const year = 1992;

// Functions
console.log(addDecl(2, 3));
// console.log(addExpr(2, 3)); // With let,const -> init error (not hoisted),
console.log(addArrow(2, 3)); // with var -> is not a function (because with var the value is undefined)

function addDecl(a, b) {
  return a + b;
}

var addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

//Example

function deleteShoppingCart() {
  console.log("All products deleted!");
}
