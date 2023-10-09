import mongoose from "mongoose";

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/clientsDB";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(uri);
}

const clientSchema = new mongoose.Schema({
  name: String,
  age: Number,
})

const Person = mongoose.model("Person", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Decent kind of fruit"
});

//fruit.save();

