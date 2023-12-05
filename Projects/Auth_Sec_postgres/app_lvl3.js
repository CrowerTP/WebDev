
import express from "express";
import bodyParser from "body-parser";
import crypto from "crypto";
import pg from "pg";
import { error } from "console";

const app = express();
const port = 3000;
const iv = Buffer.alloc(16); // zeroed-out iv
const userkey = 'abcd'
const paddedkey = Buffer.concat([Buffer.from(userkey), Buffer.alloc(12)]); // make it 128 bits key
const algorithm = 'aes-128-cbc';

app.use(bodyParser.urlencoded({ extended: true })); 

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "crypto",
    password: "a84865a84865",
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
    const hw = encrypt(password, algorithm, paddedkey);
    try {
        let result = await db.query(`INSERT INTO user_data (email, password) VALUES ('${email}','${hw}');`);
        console.log(result);
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
        const password_encrypt = result.rows[0].password;
        const password_decrypt = decrypt(password_encrypt, algorithm, paddedkey).toString();
        console.log(password_decrypt);
        if (password_form === password_decrypt){
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


function encrypt(plaintext, algorithm, key) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

function decrypt(encrypted, algorithm, key) {
  const decrypt = crypto.createDecipheriv(algorithm, key, iv);
  let text = decrypt.update(encrypted, 'base64', 'utf8');
  text += decrypt.final('utf8')
  return text;
}


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});