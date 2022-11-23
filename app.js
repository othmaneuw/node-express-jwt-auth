const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
require('dotenv/config');

const app = express();

// middleware
app.use(express.static('public'));

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