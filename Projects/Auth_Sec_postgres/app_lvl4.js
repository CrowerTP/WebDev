import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import pg from "pg";
import sha256 from "sha-256-js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); 

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "crypto",
    password: process.env.DBPASS,
    port: 5432,
  });
  db.connect();


app.get("/", ( req , res ) => {    
    res.render("home.ejs");
});

app.get("/register", ( req , res ) => {
    res.render("register.ejs");
});

app.post("/register", async( req , res ) => {
    const email = req.body.email;
    const password = req.body.password;
    const hw = hash(password);
    try {
        let result = await db.query(`INSERT INTO user_data (email, password) VALUES ('${email}','${hw}');`);
        res.render("register.ejs");
    } catch (error) {
        const message = error.message;
        console.log("Database Insert ", message);
        if (message.includes("duplicate")){
            res.render("register.ejs", {error : "Email address already exists"});
        }else{
            res.render("register.ejs", {error : "Invalid e-mail address"});
        };
    }
});

app.get("/login", async( req , res ) => {
    res.render("login.ejs");
});

app.post("/login", async( req , res ) => {
    const email_form = req.body.email;
    const password_form = req.body.password;
    try {
        let result = await db.query(`SELECT email,password FROM public.user_data WHERE email='${email_form}'; `);
        const hashed_pass_db = result.rows[0].password;
        const hashed_pass_form = hash(password_form);
        if (hashed_pass_db === hashed_pass_form){
            res.render("secrets.ejs");
        }else{
            res.render("login.ejs", {error : 'Password is not valid'});
        };
    } catch (error) {
        const message = error.message;
        console.log("Database Query ", message);
        res.render("login.ejs", {error : "Email address is not registered"});
    }
});

app.get("/submit", ( req , res) => {
    res.render("submit.ejs");
});

app.get("/logout", ( req , res) => {
    res.redirect("/");
});









//--------------------------------------------------------------------------- Server connection ---------------------------------------------------------//


function hash(plaintext) {
    const hashedText = sha256(plaintext);
    return hashedText;
}


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});