import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import passport from "passport";
import bcrypt from "bcrypt";
import session from "express-session";
import { Strategy as LocalStrategy } from 'passport-local';

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true })); 

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "crypto",
    password: process.env.DBPASS,
    port: 5432,
  });
  db.connect();

module.exports = initialize;

app.use(
session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
    conString: `postgres://postgres:${process.env.DBPASS}@localhost:5432/crypto`,
    }),
})
);

//----------------------------------------------------------------------- Endpoints -----------------------------------------------------------//

app.get("/", ( req , res ) => {    
    res.render("home.ejs");
});

app.get("/register", ( req , res ) => {
    res.render("register.ejs");
});

app.post("/register", async( req , res ) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        bcrypt.hash(password, saltRounds, async function(err,hash){
            await db.query(`INSERT INTO user_data (email, password) VALUES ('${email}','${hash}');`);
        });
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
        const match = await bcrypt.compare(password_form, hashed_pass_db);
        if(match){
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





//--------------------------------------------------------------------------- Server connection and functions---------------------------------------------------------//


function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (user_email, password, done) => {
        const user = await getUserByEmail(user_email);
        if (user.length == 0) {
        return done(null, false, { message: 'No user with that email' });
        }
        try {
        if (await bcrypt.compare(password, email[0].password)) {
            return done(null, email[0]);
        } else {
            return done(null, false, { message: 'Password incorrect' });
        }
        } catch (e) {
        return done(e);
        }
    };
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        const user = await getUserById(id);
        return done(null, user[0]);
    });
    }

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});