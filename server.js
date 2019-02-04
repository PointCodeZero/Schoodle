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
const methodOverride = require('method-override');

// const usersRoutes = require("./routes/users");
const eventsRoutes = require("./routes/events");

app.use(sass({
    src: path.join(__dirname),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(knexLogger(knex));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Mount all resource routes
app.use("/events", eventsRoutes(knex));

//Home page
app.get("/", (req, res) => {
  res.render("landing");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
