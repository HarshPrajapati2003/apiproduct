const express = require("express");
const app = express()
const PORT = process.env.PORT || 5000

require("dotenv").config()
const product_routes = require("./routes/products")
const connectDB = require("./db/connect")
app.get('/', (req, res) => {
    res.send("This is api home page")
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