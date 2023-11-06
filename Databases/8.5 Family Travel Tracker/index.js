import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "pass",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

app.get("/", async (req, res) => {
  let countries = await GetVisitedCountries();
  let currentUser = await GetCurrentUserData();
  let users = await GetUserData();
  res.render("index.ejs", { countries : countries, total : countries.length, users: users, color: currentUser.color });
});


app.post("/add", async (req, res) => {
  const country_result = req.body.country;
  console.log(req.body);
  try {
    let result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
    [country_result.toLowerCase()]
    );

    const countryCode = result.rows[0].country_code;
    console.log(countryCode);
    try {
      await db.query("INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2)",
      [countryCode,currentUserId]
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


app.post("/user", async (req, res) => {
      currentUserId = req.body.user;
      res.redirect("/");
});

app.post("/new", async (req, res) => {
  if (req.body.add){
    res.render("new.ejs");
  }else{
    const name = req.body.name;
    const color = req.body.color;
    const fullName = capitalizeWords(name);
    let result = await db.query("INSERT INTO users (name,color) VALUES ($1,$2) RETURNING id",
    [fullName, color]
    );
    currentUserId = result.rows[0].id;
    res.redirect("/");
  }
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});


//--------------------------------------------------------------------------Configure server and methods------------------------------------------------------------------------//


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

async function GetVisitedCountries(){
  let result = await db.query(`SELECT country_code FROM visited_countries WHERE user_id=${currentUserId};`);
  let countries = [];
  result.rows.forEach(country => {
    countries.push(country.country_code);
  });
  return countries;
};

async function GetCurrentUserData(){
  let result = await db.query(`SELECT * FROM users WHERE id=${currentUserId}`);
  let currentUser = result.rows[0];
  return currentUser;
};

async function GetUserData(){
  let result = await db.query(`SELECT * FROM users`);
  let users = [];
  result.rows.forEach(user => {
    users.push(user);
  });
  return users;
};

function capitalizeWords(inputString) {
  const words = inputString.split(' ');
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
}