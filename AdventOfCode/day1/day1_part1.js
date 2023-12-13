import fs from "fs";

try {
    fs.readFile("day1.txt", "utf-8", (err, data) => {
        let osszeg = 0;
        let valami;
        const lines = data.split("\n");        
        lines.forEach(text => {
            // console.log(text);
            valami = firstLastDigits(text);
            osszeg += valami;
        });
        console.log(osszeg);
    });
} catch (error) {
    console.log("Hiba a fájl olvasásakor: ", error.message);
}

function firstLastDigits (str){
    let firstNumber;
    let lastNumber;
    let number;
    const digitNumber = str.match(/\d/g);

    if (!digitNumber){
        return 0;
    };
        firstNumber = digitNumber[0];
        lastNumber = digitNumber[digitNumber.length-1];
        number = +(firstNumber + lastNumber);

    return number;
};
