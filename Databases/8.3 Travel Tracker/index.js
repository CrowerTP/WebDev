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
  database: 'postgres',
  user: 'postgres',
  password: 'pass'
});

await db.connect();

app.get("/", async (req, res) => {
  let countries = await GetVisitedCountries();
  res.render("index.ejs", { countries : countries, total : countries.length });
});

app.post("/add", async ( req , res ) => {
  const country_result = req.body.country;

  try {
    let result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
    [country_result.toLowerCase()]
    );

    const countryCode = result.rows[0].country_code;
    console.log(countryCode);
    try {
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)",
      [countryCode]
      )
      res.redirect("/");
    } catch (error) {
      let countries = await GetVisitedCountries();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "This country has already been added!"
      });
    }
  } catch (error) {
    let countries = await GetVisitedCountries();
    let error_message = "You have entered a country that doesn't exist. Try again!";
    res.render("index.ejs", {countries: countries, total: countries.length , error: error_message});
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


async function GetVisitedCountries(){
  let result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach(country => {
    countries.push(country.country_code);
  });
  return countries;
};
