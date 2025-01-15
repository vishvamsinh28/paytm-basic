require('dotenv').config()
const express = require("express")
const app = express()
const allRoutes = require("./routes/index")
const cors = require("cors")
const mongoose = require("mongoose")

app.use(cors())
app.use(express.json())

app.use("/api/v1", allRoutes)

mongoose.connect(process.env.MONGO_URL).then(() =>{
    console.log("DB Connected")
}).catch((err) => {
    console.log("Error while connecting the DB ", err)
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})
