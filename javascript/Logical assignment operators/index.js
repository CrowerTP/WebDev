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

const res1 = {
  name: "Capri",
  numGuests: 0,
};

const res2 = {
  name: "La Piazza",
  owner: "Giovanni Nizza",
};

// res1.numGuests = res1.numGuests || 10; // This is the "old" way to set default values
// res2.numGuests = res2.numGuests || 10;

// res1.numGuests ||= 10; // This is the ES6 way but it can't do anything with nullish values
// res2.numGuests ||= 10;

res1.numGuests ??= 10; // Nullish assignment operator
res2.numGuests ??= 10;

// res1.owner = res1.owner && "<ANONYMOUS>"; // This is the "old" way to set default values
// res2.owner = res2.owner && "<ANONYMOUS>";

res1.owner &&= "<ANONYMOUS>";
res2.owner &&= "<ANONYMOUS>";

console.log(res1);
console.log(res2);
