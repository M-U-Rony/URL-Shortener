const express = require("express");
const mongoose = require("mongoose");
const route = require('./Routes/route');
const SignUp = require('./Routes/user');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv').config();


const path = require('path')
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/url_shortener")
  .then(()=> console.log("Connected to MongoDB"))
  .catch((err)=> console.log(err));

app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(express.urlencoded({extended:true}));

app.use('/',route);
app.use('/user',SignUp);



app.listen(port,()=> console.log(`Server Listening on Port ${port}`));