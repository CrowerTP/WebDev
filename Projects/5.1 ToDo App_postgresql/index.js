import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  password: "a84865a84865",
  database: "todo",
  host: "localhost",
  port: "5432"
})

await db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/" , async ( req , res ) => {
  const dailyTasks = await GetDailyTasks();
  res.render("index.ejs", {dailyArray: dailyTasks});
})

app.get("/work", async ( req , res ) => {
  const workTasks = await GetWorkTasks();
  res.render("work.ejs", {workArray: workTasks});
})

app.post("/submit", ( req , res) => {
  res.redirect("/");
})

app.post("/worksubmit", ( req , res ) => {
  res.redirect("/work");
})

app.post("/delete", async ( req , res ) => {
  res.redirect("/");
})

app.post("/deleteWork", async ( req , res ) => {
  res.redirect("/work");
})

// -----------------------------------------------------------------------Methods and create server connection -------------------------------------------------//


async function GetDailyTasks(){
  let dailyTasks = [];
  let result = await db.query("SELECT * FROM dailytasks");
  dailyTasks = result.rows;
  return dailyTasks;
}

async function GetWorkTasks(){
  let workTasks = [];
  let result = await db.query("SELECT * FROM worktasks");
  workTasks = result.rows;
  return workTasks;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });