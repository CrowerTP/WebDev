import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/clientsDB";

dbConnect().catch(err => console.log(err));

async function dbConnect() {
    await mongoose.connect(uri);
}

const clientsSchema = mongoose.Schema({
    name:   String,
    age:    Number
})

const Client = mongoose.model("Client", clientsSchema);

const client = new Client({
    name: "John",
    age: 32
})

client.save();