import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/clientsDB";

dbConnect().catch(err => console.log(err));

async function dbConnect() {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.error("Failed to connect: " + error);
    }

};

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    reviews: Array
});

const Product = mongoose.model("Product", productSchema);
const product = new Product({
    name: "Pencil",
    price: 0.3,
    stock: 12
});

//saveDB(product);

const clientsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name has to be defined"]
    },
    age: Number,
    favouriteProduct: productSchema
});

const Client = mongoose.model("Client", clientsSchema);
const client = new Client({
    name: "Anna",
    age: 28,
    favouriteProduct: product
});


//saveDB(client);


//updateDB();
//deleteDB();


// const clients = await Product.find();

// clients.forEach(doc => {
//     console.log(doc.name);
// });


async function saveDB(db){
    try {
        await db.save();
        console.log("Save was successful!")
    } catch (error) {
        console.error("Failed to save the db: " + error);
    }
};

async function updateDB(){
    try {
        await Client.updateOne({name: "Peter"}, {favouriteProduct: product});
        console.log("Updating document was successful!");
    } catch (error) {
        console.log(error);
    }
};

async function deleteDB(){
    try {
        await Product.deleteOne({_id: "652476067f27f3269baea812"});
        console.log("Delete was succesful!")
    } catch (error) {
        console.log("Failed to delete: " + error);
    }
};