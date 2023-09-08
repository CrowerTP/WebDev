import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async ( req , res ) => {
    try {
        const result = await axios.get(API_URL + "/random");
        res.render("index.ejs", { secret: JSON.stringify(result.data.secret) , user: JSON.stringify(result.data.username)});

    }catch (error) {
        console.error("Failed to send request: ", error.message);
    }
} )

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
