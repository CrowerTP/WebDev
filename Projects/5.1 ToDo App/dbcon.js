import mongoose from "mongoose";


export const taskSchema = new mongoose.Schema({
    text: String
  })
  
export const Task = mongoose.model("Task", taskSchema);
export const WorkTask = mongoose.model("WorkTask", taskSchema);


export async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/tasksDB");
}