const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:[true,"Price must be provided"]
    },
    featured:{
        type : Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.9
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    },
    company:{
        type:String,
        values:["apple","samsung","dell","hp"],
        message:`THIS COMPANY IS NOT SUPPORTED`
    }
})

module.exports = mongoose.model("Product",productSchema)