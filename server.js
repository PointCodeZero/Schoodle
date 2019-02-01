"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 3000;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const path        = require('path');
const app         = express();
const sass        = require("node-sass-middleware");
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const session     = require('express-session');

const usersRoutes = require("./routes/users");
const eventsRoutes = require("./routes/events");



app.use(sass({
    /* Options */
    src: path.join(__dirname),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// Seperated Routes for each Resource

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/events", eventsRoutes(knex));

//Home page
app.get("/", (req, res) => {
  res.render("landing");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
