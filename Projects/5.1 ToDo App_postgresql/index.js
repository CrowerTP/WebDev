import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  password: "[password]",
  database: "todo",
  host: "localhost",
  port: "5432",
});

await db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const dailyTasks = await GetDailyTasks();
  res.render("index.ejs", { dailyArray: dailyTasks });
});

app.get("/work", async (req, res) => {
  const workTasks = await GetWorkTasks();
  res.render("work.ejs", { workArray: workTasks });
});

app.post("/submit", async (req, res) => {
  const newTask = req.body.input_text;
  await db.query(`INSERT INTO dailytasks (task) VALUES ('${newTask}');`);
  res.redirect("/");
});

app.post("/worksubmit", async (req, res) => {
  const newTask = req.body.input_text;
  await db.query(`INSERT INTO worktasks (task) VALUES ('${newTask}');`);
  res.redirect("/work");
});

app.post("/edit", async (req, res) => {
  let updatedTask = req.body.updatedItemTitle;
  let updatedId = req.body.updatedItemId;
  await db.query(
    `UPDATE dailytasks SET task = '${updatedTask}' WHERE id = ${updatedId};`
  );
  res.redirect("/");
});

app.post("/editwork", async (req, res) => {
  let updatedTask = req.body.updatedItemTitle;
  let updatedId = req.body.updatedItemId;
  await db.query(
    `UPDATE worktasks SET task = '${updatedTask}' WHERE id = ${updatedId};`
  );
  res.redirect("/work");
});

app.post("/delete", async (req, res) => {
  let deletedId = req.body.checkThis;
  await db.query(`DELETE FROM dailytasks WHERE id = ${deletedId};`);
  res.redirect("/");
});

app.post("/deleteWork", async (req, res) => {
  let deletedId = req.body.checkThis;
  await db.query(`DELETE FROM worktasks WHERE id = ${deletedId};`);
  res.redirect("/work");
});

// -----------------------------------------------------------------------Methods and create server connection -------------------------------------------------//

async function GetDailyTasks() {
  let dailyTasks = [];
  let result = await db.query("SELECT * FROM dailytasks");
  dailyTasks = result.rows;
  Sort(dailyTasks);
  return dailyTasks;
}

async function GetWorkTasks() {
  let workTasks = [];
  let result = await db.query("SELECT * FROM worktasks");
  workTasks = result.rows;
  Sort(workTasks);
  return workTasks;
}

function Sort(array) {
  array.sort((a, b) => a.id - b.id);
  return array;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
