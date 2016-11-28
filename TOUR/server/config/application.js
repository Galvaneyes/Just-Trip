/* globals module require */
"use strict";

const express = require("express");
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

app.set("view engine", "pug");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));
app.use("static", express.static("../../public"));

module.exports = app;