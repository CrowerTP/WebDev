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

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta that contains ${ing1}, ${ing2} and ${ing3}`
    );
  },
};

// SPREAD because ... is on the RIGHT side of =
const arr = [1, 2, ...[3, 4]];

// REST, because ... is on the RIGHT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5, 6];
console.log(a, b, others);

// Arrays
const [food1, , food3, ...otherFood] = [
  ...restaurant.starterMenu,
  ...restaurant.mainMenu,
];
console.log(food1, food3, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

// Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3);
add(2, 3, 4, 6, 8, 9);
add(2, 3, 3, 12, 4, 5, 6, 7);

const x = [24, 5, 7];

add(...x);
