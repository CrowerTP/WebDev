"use strict";

function calcAge(birthYear){
    const age = 2024-birthYear;
    
    function printAge() {
        const output = `${firstName} are ${age}, born in ${birthYear}`;
        console.log(output);

        if (birthYear >= 1992 && birthYear <= 1996){
            var millenial = true;
            const str = `Oh, and you're a millenial, ${firstName}`;
            console.log (str);
        } 
        // console.log(str);
        console.log(millenial);
    }
    printAge();

    return age
}

const firstName = 'Peter';
calcAge(1992);