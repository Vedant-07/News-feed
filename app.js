const express = require('express')
const app = express()
const dotenv=require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
//path for dotenv
const path = require("path");
dotenv.config({path:'./server/config.env'})
require('./db/conn');
app.use(express.json())
app.use(cookieParser())
app.use(require('./router/auth'))
//const User= require('./model/userSchema')
//console.log('again on app.js ');

//deploying production
if ( process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
})