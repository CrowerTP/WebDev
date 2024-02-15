"use strict";

var firstName = "Matilda";

const peter = {
  firstName: "Péter",
  year: 1992,
  calcAge: function () {
    //console.log(this);
    console.log(2024 - this.year);

    // Solution 1 to use the 'this' keyword inside a regular function.
    // const self = this;                                      // inside a regular function calls the this keyword must be undefined, so before ES6 it was solved with a self
    //                                                         // variable but this is an OLD solution.
    // const isMillenial = function self() {
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // Solution 2 to use the 'this' keyword inside a regular function.

    const isMillenial = () => {
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillenial();
  },

  greet: () => console.log(`Hey ${this.firstName}!`), // NEVER USE ARROW FUNCTION AS A METHOD BECAUSE OF THIS: Now the function call results "Hey Matilda!" But it will be
  // var firstName what we defined on the top, not the firstName of the Peter object.
};

peter.greet();
peter.calcAge();

// arguments keyword
var addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};

addExpr(2, 4);
addArrow(2, 4);
