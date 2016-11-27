/* global require module*/
"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname:String,
    age: Number,
    country: String,
    city: String,
    tours:[{}]
});

mongoose.model("user", userSchema);

module.exports = mongoose.model("user"); 