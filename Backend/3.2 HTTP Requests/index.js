import express from "express";

const app = express();
const port = 3000;

app.get("/", (req , res) => {
    res.send("<h1>Hello Peter! What's up with you fella? :)</h1>");
})

app.get("/contact", (req , res) => {
    res.send("<h1>My Phone number is +3620457235</h1><h2>And my Name is Peter :)</h2>");
})

app.get("/about", (req , res) => {
    res.send("I'm a software engineer ( hopefully will be a web developer :P )");
})

app.post("/register", (req , res) => {
    res.sendStatus(201);
})

app.put("/user/peter", (req , res) => {
    res.sendStatus(200);
})

app.patch("/user/peter", (req , res) => {
    res.sendStatus(200);
})

app.delete("/user/peter", (req , res) => {
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Your server is running on port ${port}`);
})

