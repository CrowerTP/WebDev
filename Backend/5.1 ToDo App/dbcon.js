import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    text: String
  })
  
const Task = mongoose.model("Task", taskSchema);


export async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/tasksDB");
}