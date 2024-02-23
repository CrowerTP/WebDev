"use strict";

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0,
      close: 24,
    },
  },

  order: function (starterDishIndex, mainDishIndex) {
    return [this.starterMenu[starterDishIndex], this.mainMenu[mainDishIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = "20:00",
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered at ${time} to ${address}`
    );
  },

  orderPasta: function (ing1 = "sour", ing2 = "water", ing3 = "egg") {
    console.log(
      `Here is your delicious pasta that contains ${ing1}, ${ing2} and ${ing3}`
    );
  },
};

restaurant.numGuests = 0; // SETTING DEFAULT VALUES IS MORE EASIER
const guests = restaurant.numGuests || 10;
console.log(guests);

// nullish: null and undefined (NOT 0 or '')
const guestsRight = restaurant.numGuests ?? 10;
console.log(guestsRight);

// SHORT CIRCUITING
// console.log("----- OR -----"); // OR returns the first TRUTHY value or the last if all is falsy
// // Use ANY data type, return ANY data type and it does short-circuiting
// console.log(3 || "Jonas"); // 3
// console.log("" || "Jonas"); // Jonas
// console.log(true || 0); // true
// console.log(undefined || null); // null

// restaurant.numGuests = 0; // SETTING DEFAULT VALUES IS MORE EASIER
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// console.log("----- AND -----"); // AND returns the first FALSY value or the last if all is truthy

// console.log("Jonas" && 23 && null && false); // null will be returned since that is the first falsy value

// restaurant.orderPasta && restaurant.orderPasta("mushrooms", "spinach");
