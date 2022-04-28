require("express-async-errors")
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet')
require("dotenv").config()


const connectDB = require("./db/connect")

app.use(express.urlencoded({limit:"30mb",extended: true}))
app.use(express.json({limit:"30mb",extended: true}))
app.use(cors())
app.use(helmet())

app.use("/",require("./src/routes"))
app.use(require("./src/middleware/error"))

const port = process.env.PORT || 8080

const start = async ()=>{
  try{
    
    await connectDB(process.env.MONGO_URL)
    
    app.listen(port,()=>{
      console.log(`listening on port ${port}...........`)
    })
  
  }catch(err){

    console.log(`connection failed: ${err}`)

  }
}  
start();
