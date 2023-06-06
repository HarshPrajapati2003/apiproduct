require("dotenv").config();
const connectDB = require("./db/connect")
const product = require("./models/products")

const ProductJson = require("./product.json")

const start=async () =>{
    try{
        await connectDB(process.env.MONGODB_URI)
        await product.deleteMany()
        await product.create(ProductJson)
        console.log("success")
    }
    catch(err){
        console.log(err);
    }
}

start()