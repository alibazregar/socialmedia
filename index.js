const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config()

const connectDB = require("./db/connect")

const port = process.env.PORT || 8080

const start = async ()=>{
  await connectDB(process.env.MONGO_URL)
  app.listen(port,()=>{
    console.log(`listening on the port ${port}`);
  })
}
start()
