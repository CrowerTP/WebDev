'use strict';


const peter = {
    firstName: 'Péter',
    lastName: 'Telek',
    birthYear: 1992,
    job: 'Engineer',
    favouriteAnimal: 'Elephant',
    friends: ['Laci', 'Norbi', 'Máté'],

    calcAge: function(){
        return this.age = 2024-this.birthYear;
    },
    hasDriversLicence:  true,
    getSummary: function(){
        const Summary = `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and has ${this.hasDriversLicence ? 'a' : 'no'} Drivers Licence.`;
        return Summary;
    }
};

console.log(peter.getSummary());
