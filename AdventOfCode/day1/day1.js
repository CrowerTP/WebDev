import fs from "fs";

try {
    fs.readFile("day1.txt", "utf-8", (err, data) => {
        const lines = data.split("\n");
    });
} catch (error) {
    console.log("Hiba a fájl olvasásakor: ", error.message);
}
