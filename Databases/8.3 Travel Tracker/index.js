import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  host: 'localhost',
  port: '5432',
  database: 'world',
  user: 'postgres',
  password: 'a84865a84865'
});

await db.connect();

app.get("/", async (req, res) => {
  let result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach(country => {
    countries.push(country.country_code);
  });
  res.render("index.ejs", { countries : countries, total : countries.length });
});

app.post("/add", async ( req , res ) => {
  const country_result = req.body.country;
  const new_country = country_result.charAt(0).toUpperCase() + country_result.slice(1);
  try {
    let result = await db.query("SELECT country_code FROM countries WHERE country_name = $1",
    [new_country]
    );    
    let countryCode = result.rows[0].country_code;
    db.query("INSERT INTO visited_countries (country_code) VALUES ($1)",
    [countryCode]
    )
    res.redirect("/");
  } catch (error) {
    console.log("Error executing query -> ", error.stack);
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
