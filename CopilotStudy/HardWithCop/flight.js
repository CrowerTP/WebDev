"use strict";

import readline from "readline";
import fs from "fs";
import csv from "csv-parser";

// Create a readline interface for user interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Define the flights and reservations arrays
let flights = [];
let reservations = [];

// Load data from the JSON file
loadData();

function loadData() {
  try {
    const data = JSON.parse(fs.readFileSync("data.json"));
    flights = data.flights;
    reservations = data.reservations;
  } catch (error) {
    // Generate random flights if the file does not exist
    console.log("No existing database detected. Generating random flights.");

    // Generate 10 random flights
    const capitals = [];
    fs.createReadStream("capitals.csv")
      .pipe(csv())
      .on("data", (row) => {
        capitals.push(row.capital);
      })
      .on("end", () => {
        generateFlights(capitals);
      });
  }

  // Start the application
  promptForAction();
}

function saveData() {
  const data = { flights, reservations };
  fs.writeFileSync("data.json", JSON.stringify(data));
}

function promptForAction() {
  rl.question(
    "Enter action (list, search, book, review, cancel, quit): ",
    (action) => {
      switch (action) {
        case "list":
          promptForList();
        case "search":
          promptForSearch();
          break;
        case "book":
          promptForBook();
          break;
        case "review":
          promptForReview();
          break;
        case "cancel":
          promptForCancel();
          break;
        case "quit":
          saveData();
          rl.close();
          break;
        default:
          console.log(
            "Invalid action. Please enter search, book, review, cancel, or quit."
          );
          promptForAction();
      }
    }
  );
}

function promptForList() {
  console.log("Available flights:");
  flights.forEach((flight) => {
    console.log(`Flight ID: ${flight.id}`);
    console.log(`Departure: ${flight.departure}`);
    console.log(`Destination: ${flight.destination}`);
    console.log(`Departure time: ${flight.time}`);
    console.log(`Travel time: ${flight.travelTime}`);
    console.log(
      `Seats: Economy - ${flight.seats.economy}, Business - ${flight.seats.business}`
    );
    console.log(
      `Prices: Economy - ${flight.prices.economy}, Business - ${flight.prices.business}`
    );
    console.log("--------------------");
  });

  promptForAction();
}

function promptForSearch() {
  rl.question(
    "Enter departure and destination (comma-separated): ",
    (input) => {
      const [departure, destination] = input
        .split(",")
        .map((item) => item.trim());

      const foundFlights = flights.filter(
        (flight) =>
          flight.departure === departure && flight.destination === destination
      );
      try {
        if (!(departure && destination)) {
          console.log(
            "Error: You must enter exactly two parameters: departure and destination."
          );
          promptForAction();
          return;
        }
        if (foundFlights.length === 0) {
          console.log(
            "Error: No flights found with the specified departure and destination."
          );
          promptForAction();
          return;
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
        promptForAction();
        return;
      }

      console.log("Found flights:");
      foundFlights.forEach((flight) => {
        console.log(`Flight ID: ${flight.id}`);
        console.log(`Departure: ${flight.departure}`);
        console.log(`Destination: ${flight.destination}`);
        console.log(`Departure time: ${flight.time}`);
        console.log(`Travel time: ${flight.travelTime}`);
        console.log(
          `Seats: Economy - ${flight.seats.economy}, Business - ${flight.seats.business}`
        );
        console.log(
          `Prices: Economy - ${flight.prices.economy}, Business - ${flight.prices.business}`
        );
        console.log("--------------------");
      });

      promptForAction();
    }
  );
}

function promptForBook() {
  rl.question(
    "Enter flight ID, seat class, and number of seats (comma-separated): ",
    (input) => {
      const [flightId, seatClass, numSeats] = input
        .split(",")
        .map((item) => item.trim().toLowerCase());

      const flight = flights.find((flight) => flight.id === Number(flightId));

      try {
        if (!(flightId && seatClass && numSeats)) {
          console.log(
            "Error: You must enter exactly three parameters: flight ID, seat class, and number of seats."
          );
          promptForAction();
          return;
        }

        if (!flight) {
          console.log(`Error: No flight found with the ID ${flightId}.`);
          promptForAction();
          return;
        }

        if (!flight.seats[seatClass]) {
          console.log(
            `Error: ${seatClass} class for this Flight is not available.`
          );
          promptForAction();
          return;
        }

        if (flight.seats[seatClass] < Number(numSeats)) {
          console.log(
            `Error: Not enough seats available in ${seatClass} class for this flight.`
          );
          promptForAction();
          return;
        }
        if (numSeats < 1) {
          console.log(`Error: You must book at least one seat.`);
          promptForAction();
          return;
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
        promptForAction();
        return;
      }

      flight.seats[seatClass] -= Number(numSeats);
      for (let i = 0; i < Number(numSeats); i++) {
        reservations.push({
          id: flight.id,
          departure: flight.departure,
          destination: flight.destination,
          time: flight.time,
          travelTime: flight.travelTime,
          seatClass: seatClass,
          price: flight.prices[seatClass],
        });
      }
      saveData();

      console.log("Flight booked.");
      promptForAction();
    }
  );
}

function promptForReview() {
  const uniqueReservations = [];
  console.log("Your reservations:");
  reservations.forEach((reservation) => {
    if (
      !uniqueReservations.some(
        (uniqueReservation) =>
          uniqueReservation.id === reservation.id &&
          uniqueReservation.seatClass === reservation.seatClass
      )
    ) {
      uniqueReservations.push(reservation);
    }
  });
  uniqueReservations.forEach((reservation) => {
    console.log(`Flight ID: ${reservation.id}`);
    console.log(`Departure: ${reservation.departure}`);
    console.log(`Destination: ${reservation.destination}`);
    console.log(`Departure time: ${reservation.time}`);
    console.log(`Travel time: ${reservation.travelTime}`);
    console.log(`Seat Class: ${reservation.seatClass}`);
    console.log(`Price: ${reservation.price}`);
    console.log("--------------------");
  });

  console.log("Reserved flights:");
  const flightReservations = {};
  reservations.forEach((reservation) => {
    if (!flightReservations[reservation.id]) {
      flightReservations[reservation.id] = {};
    }
    if (!flightReservations[reservation.id][reservation.seatClass]) {
      flightReservations[reservation.id][reservation.seatClass] = 0;
    }
    flightReservations[reservation.id][reservation.seatClass]++;
  });

  for (const flightId in flightReservations) {
    const reservationSummary = Object.entries(flightReservations[flightId])
      .map(([seatClass, count]) => `${seatClass}: ${count}`)
      .join(", ");
    console.log(`Flight ID: ${flightId}, Seat type: ${reservationSummary}`);
  }

  promptForAction();
}

function promptForCancel() {
  rl.question(
    "Enter flight ID, seat class, and number of reservations to cancel (comma-separated): ",
    (data) => {
      const [flightId, seatClass, numReservations] = data
        .split(",")
        .map((item) =>
          item.trim().toLowerCase() === "business" ||
          item.trim().toLowerCase() === "economy"
            ? item.trim().toLowerCase()
            : Number(item.trim())
        );

      const flightReservations = reservations.filter(
        (reservation) => reservation.id === flightId
      );
      const seatClassReservations = flightReservations.filter(
        (reservation) => reservation.seatClass === seatClass
      );
      try {
        if (!(flightId && seatClass && numReservations)) {
          console.log(
            "Error: You must enter exactly three parameters: flight ID, seat class, and number of reservations to cancel."
          );
          promptForAction();
          return;
        }
        if (flightReservations.length === 0) {
          console.log(`Error: No reservation found with the ID ${flightId}`);
          promptForAction();
          return;
        }
        if (seatClassReservations.length === 0) {
          console.log(
            `Error: There is no reservation with the seat class ${seatClass} for this flight.`
          );
          promptForAction();
          return;
        }

        if (
          numReservations < 1 ||
          numReservations > seatClassReservations.length
        ) {
          console.log(
            "Error: The number of reservations to cancel is invalid. Please enter a valid number."
          );
          promptForAction();
          return;
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
        promptForAction();
        return;
      }

      for (let i = 0; i < numReservations; i++) {
        const index = reservations.findIndex(
          (reservation) =>
            reservation.id === flightId && reservation.seatClass === seatClass
        );

        if (index !== -1) {
          const reservation = reservations[index];
          const flight = flights.find((flight) => flight.id === reservation.id);

          if (flight) {
            flight.seats[reservation.seatClass]++;
          }

          reservations.splice(index, 1);
        }
      }
      saveData();

      console.log("Reservation cancelled.");
      promptForAction();
    }
  );
}

function generateFlights(capitals) {
  for (let i = 1; i <= 10; i++) {
    const departure = capitals[Math.floor(Math.random() * capitals.length)];
    let destination = capitals[Math.floor(Math.random() * capitals.length)];

    while (destination === departure) {
      destination = capitals[Math.floor(Math.random() * capitals.length)];
    }

    const flight = {
      id: i,
      departure: departure,
      destination: destination,
      time: `${String(Math.floor(Math.random() * 24)).padStart(
        2,
        "0"
      )}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
      travelTime: `${Math.floor(Math.random() * 19 + 2)} hours`,
      seats: {
        economy: Math.floor(Math.random() * 100),
        business: Math.floor(Math.random() * 50),
      },
      prices: {
        economy: Math.floor(Math.random() * 100 + 100),
        business: Math.floor(Math.random() * 200 + 200),
      },
    };

    flights.push(flight);
    saveData();
  }
}
