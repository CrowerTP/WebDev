//jshint esversion:6

import express from "express";
import bodyParser from "body-parser";
//const date = require(__dirname + "/date.js");
import { getDate } from "./date.js";
import mongoose from "mongoose";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["item1", "item2", "item3"];
const workItems = [];

app.get("/", function(req, res) {

const day = getDate();

  res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3005, function() {
  console.log("Server started on port 3000");
});
