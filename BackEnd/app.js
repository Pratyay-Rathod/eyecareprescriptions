const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routers/routers");
require('dotenv').config();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use(express.json())

app.use(router);

const password = process.env.DB_PASSWORD;
const dbURL = "mongodb://localhost:27017/EyeCare";

mongoose.connect("mongodb+srv://oticareuser:opticareuser@cluster0.6c7agzt.mongodb.net/EyeCare>retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true}).then((result)=>{
    console.log("connection success");
    app.listen(8000,(req,res)=>{
        console.log("Listening to the port number 8000");
    });
}).catch((error)=>{
    console.log(error);
})