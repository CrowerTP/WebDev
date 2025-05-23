"use-strict";

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

// KEYS
const properties = Object.keys(restaurant.openingHours);
let openDays = `We are open on ${properties.length} days. `;

for (const day of properties) {
  openDays += `${day}, `;
}

console.log(openDays);

// VALUES
const values = Object.values(restaurant.openingHours);
console.log(values);

// ENTRIES
const entries = Object.entries(restaurant.openingHours);
console.log(entries);

// example
for (const [day, { open, close }] of entries) {
  console.log(`On ${day}, we are open at ${open} and close at ${close}`);
}
