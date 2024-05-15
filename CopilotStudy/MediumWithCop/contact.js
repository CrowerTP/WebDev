"use strict";

import readline from "readline";

// Create a readline interface for user interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Define the contacts array
let contacts = [];

// Define the unique ID counter
let idCounter = 1;

// Start the application
promptForAction();

function promptForAction() {
  rl.question(
    "Enter action (create, read, update, delete, quit): ",
    (action) => {
      switch (action) {
        case "create":
          promptForContact();
          break;
        case "read":
          promptForRead();
          break;
        case "update":
          promptForUpdate();
          break;
        case "delete":
          promptForDelete();
          break;
        case "quit":
          rl.close();
          break;
        default:
          console.log(
            "Invalid action. Please enter create, read, update, delete, or quit."
          );
          promptForAction();
      }
    }
  );
}

function promptForContact() {
  rl.question(
    "Enter name, home address, telephone number, and availability hour (comma-separated): ",
    (data) => {
      const parameters = data.split(",").map((item) => item.trim());

      // Check if the number of parameters is exactly 4
      if (parameters.length !== 4) {
        console.log("Error: Invalid number of parameters.");
        promptForAction();
        return;
      }

      const [name, homeAddress, telephoneNumber, availabilityHour] = data
        .split(",")
        .map((item) => item.trim());

      // Check if the telephone number is unique
      if (
        contacts.some((contact) => contact.telephoneNumber === telephoneNumber)
      ) {
        console.log("Error: Telephone number must be unique.");
        promptForAction();
        return;
      }

      // Create the new contact
      const contact = {
        id: idCounter++,
        name,
        homeAddress,
        telephoneNumber,
        availabilityHour,
      };

      // Add the contact to the contacts array
      contacts.push(contact);

      console.log("Contact created.");
      promptForAction();
    }
  );
}

function promptForRead() {
  rl.question("Enter availability hour: ", (availabilityHour) => {
    // Find all contacts with the given availability hour
    const foundContacts = contacts.filter(
      (contact) => contact.availabilityHour === availabilityHour
    );

    // Print the found contacts
    console.log("Found contacts:");
    foundContacts.forEach((contact) => console.log(JSON.stringify(contact)));

    promptForAction();
  });
}

function promptForUpdate() {
  rl.question("Enter ID of contact to update: ", (id) => {
    // Find the contact with the given ID
    const contact = contacts.find((contact) => contact.id === Number(id));

    if (!contact) {
      console.log("Error: No contact found with the given ID.");
      promptForAction();
      return;
    }

    rl.question(
      "Enter new name, home address, telephone number, and availability hour (comma-separated): ",
      (data) => {
        const parameters = data.split(",").map((item) => item.trim());

        // Check if the number of parameters is exactly 4
        if (parameters.length !== 4) {
          console.log("Error: Invalid number of parameters.");
          promptForAction();
          return;
        }

        const [name, homeAddress, telephoneNumber, availabilityHour] = data
          .split(",")
          .map((item) => item.trim());

        // Check if the telephone number is unique
        if (
          contacts.some(
            (contact) =>
              contact.telephoneNumber === telephoneNumber &&
              contact.id !== Number(id)
          )
        ) {
          console.log("Error: Telephone number must be unique.");
          promptForAction();
          return;
        }

        // Update the contact
        contact.name = name;
        contact.homeAddress = homeAddress;
        contact.telephoneNumber = telephoneNumber;
        contact.availabilityHour = availabilityHour;

        console.log("Contact updated.");
        promptForAction();
      }
    );
  });
}

function promptForDelete() {
  rl.question("Enter ID of contact to delete: ", (id) => {
    // Find the index of the contact with the given ID
    const index = contacts.findIndex((contact) => contact.id === Number(id));

    if (index === -1) {
      console.log("Error: No contact found with the given ID.");
      promptForAction();
      return;
    }

    // Remove the contact from the contacts array
    contacts.splice(index, 1);

    console.log("Contact deleted.");
    promptForAction();
  });
}
