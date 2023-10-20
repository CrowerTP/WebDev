import express from "express";
import bodyParser from "body-parser";
import { main, Task, WorkTask, taskSchema } from "./dbcon.js";

const app = express();
const port = 3000;
let dailyTasks = [];
let workTasks = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
main().catch(err => console.log(err));


app.get("/" , async ( req , res ) => {
  dailyTasks = [];
  const tasks = await Task.find();
  tasks.forEach(task => {
    dailyTasks.push(task);
  });
  res.render("index.ejs" , {dailyArray : dailyTasks});
})

app.get("/work", async ( req , res ) => {
  workTasks = [];
  const tasks = await WorkTask.find();
  tasks.forEach(task => {
    workTasks.push(task);
  });
  res.render("work.ejs" , {workArray : workTasks});
})

app.post("/submit", ( req , res) => {
  const textSubmitted = new Task({
    text: req.body.input_text
  })
  textSubmitted.save();
  res.redirect("/");
})

app.post("/worksubmit", ( req , res ) => {
  const textSubmitted = new WorkTask({
    text: req.body.input_text
  })
  textSubmitted.save();
  res.redirect("/work");
})

app.post("/delete", async ( req , res ) => {
  await Task.findByIdAndDelete(req.body.checkThis);
  res.redirect("/");
})

app.post("/deleteWork", async ( req , res ) => {
  await WorkTask.findByIdAndDelete(req.body.checkThis);
  res.redirect("/work");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });