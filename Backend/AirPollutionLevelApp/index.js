import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_KEY = "0677d0d7-fc16-4db1-b4e7-f71b3e69d2fd"
const API_URL = "https://secrets-api.appbrewery.com";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async ( req , res ) => {
    res.render("index.ejs", { message: `Válassz egy várost a légszennyezettség megtekintésére!`});
})

app.get("/budapest", async ( req , res ) => {
    const response = await axios.get(`https://api.airvisual.com/v2/city?city=Budapest&state=Central+Hungary&country=Hungary&key=${API_KEY}`);
    const {city , state, country, location, current} = response.data.data;
    const { pollution , weather } = current;
    console.log(req.body);
    res.render("index.ejs", { message: `A jelenlegi AQI (Légszennyezettségi index) itt --> ${city}: ${pollution.aqius}.`});
})


app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
    });