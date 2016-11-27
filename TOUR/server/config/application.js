/* globals module require */
"use strict";

const express = require("express");
const app = express();

app.set("view engine", "pug");
app.use("static", express.static("../../public"));

module.exports = app;