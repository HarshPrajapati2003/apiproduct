const mongoose = require("mongoose")

const connectDB = (uri)=>{
    console.log("connection successful")
    return mongoose.connect(uri)
}

module.exports = connectDB