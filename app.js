// Host api link : https://apiproduct-production.up.railway.app/api/products
const express = require("express");
const app = express()
const PORT = process.env.PORT || 5000

require("dotenv").config()
const product_routes = require("./routes/products")
const connectDB = require("./db/connect")
app.get('/', (req, res) => {
    res.send("Add /api/products in current URL so you can see API")
})

// middleware for set routes
app.use("/api/products",product_routes)

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(PORT, () => {
            console.log("Port is live on 5000")
        })
    } catch (err) {
        console.log(`Port is not live because of this error: ${err}`)
    }
}

start();
