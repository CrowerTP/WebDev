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

const arr = [6, 7, 8];
const newArr = [1, 2, ...arr];
console.log(newArr);

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// pass separate arguments to a method
const pastaIngredients = ["sour", "water", "egg"];

restaurant.orderPasta(...pastaIngredients);

// copy whole objects
const newRestaurant = {
  ...restaurant,
  founder: "Giuseppe Ristoranto",
  foundedIn: 1992,
};
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Peter's Italian Restaurant";
console.log(restaurant.name);
console.log(restaurantCopy.name);
