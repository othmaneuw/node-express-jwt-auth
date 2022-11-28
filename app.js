const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
require('dotenv/config');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.DB_CONNECT;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    app.listen(3000);
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

// routes
app.use(authRoutes);

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

// app.get('/get-cookie',(req,res)=>{
//     res.cookie('name','Othmane', {httpOnly:true});
//     res.cookie('age','21',{maxAge: 1000*60*60*24 , httpOnly : true});
//     res.send('You got the cookies');
// })

// app.get('/read-cookie',(req,res)=>{
//      res.json(req.cookies);
// })
// // Once the ccokies are added I can access them on any request made through the req object
// app.get('/oth',(req,res)=>{
//   console.log(req.cookies);
// })