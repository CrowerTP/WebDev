"use strict";

import fs from "fs";

// Get the input file name from the command line arguments
const inputFileName = process.argv[2];

try {
  // Check if the input file exists
  if (!fs.existsSync(inputFileName)) {
    throw new Error("There is no input.txt found");
  }

  // Read the content of the input file
  const content = fs.readFileSync(inputFileName, "utf8");

  // Split the content into an array of integers
  const numbers = content.split(",").map(Number);

  // Sort the numbers in ascending order
  numbers.sort((a, b) => a - b);
  console.log(numbers);

  // Calculate the median
  let median;
  const middle = Math.floor(numbers.length / 2);

  if (numbers.length % 2 === 0) {
    // If the length is even, the median is the average of the two middle numbers
    median = (numbers[middle - 1] + numbers[middle]) / 2;
  } else {
    // If the length is odd, the median is the middle number
    median = numbers[middle];
  }

  // Write the median to the output file
  fs.writeFileSync("output.txt", median.toString());
} catch (error) {
  console.error(error.message);
}
