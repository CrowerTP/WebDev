"use strict";

const orderSet = new Set([
  "Pasta",
  "Pizza",
  "Pizza",
  "Risotto",
  "Pasta",
  "Pizza",
]);
console.log(orderSet);

console.log(new Set("Jonas"));

console.log(orderSet.size);
console.log(orderSet.has("Pizza"));
console.log(orderSet.has("Bread"));
orderSet.add("Garlic Bread");
orderSet.add("Garlic Bread");
console.log(orderSet);
orderSet.delete("Pizza");
console.log(orderSet);
// orderSet.clear();
console.log(orderSet);

for (const element of orderSet) {
  console.log(element);
}

// Example
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
const staffUnique = new Set(staff);
console.log(staffUnique);

const staffArray = [...staffUnique];
console.log(staffArray);

console.log(new Set("TelekPeter").size);
