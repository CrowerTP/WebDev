import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;
const dailyTasks = [];
const workTasks = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const taskSchema = mongoose.Schema({
  text: String
})

const Task = mongoose.model("Task", taskSchema);

app.get("/" , ( req , res ) => {
  res.render("index.ejs" , {dailyArray : dailyTasks});
})

app.get("/work", ( req , res ) => {
  res.render("work.ejs" , {workArray : workTasks});
})

app.post("/submit", ( req , res) => {
  const renderedText = req.body.input_text;
  dailyTasks.push(renderedText);
  res.render("index.ejs", {dailyArray : dailyTasks});
})

app.post("/worksubmit", ( req , res ) => {
  const renderedText = req.body.input_text;
  workTasks.push(renderedText);
  res.render("work.ejs", {workArray : workTasks});
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });