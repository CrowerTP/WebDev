"use strict";

// Say we have an object and we want to insert it into another object
const openingHours = {
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
};

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  // -----------------------INSERT OBJECTS-----------------------
  // Before ES6
  // openingHours: openingHours,

  // With ES6
  openingHours,

  // ----------------------METHOD SYTAX----------------------
  // Before ES6
  // order: function (starterDishIndex, mainDishIndex) {
  //   return [this.starterMenu[starterDishIndex], this.mainMenu[mainDishIndex]];
  // },

  // With ES6
  order(starterDishIndex, mainDishIndex) {
    return [this.starterMenu[starterDishIndex], this.mainMenu[mainDishIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered at ${time} to ${address}`
    );
  },
};

console.log(restaurant);
