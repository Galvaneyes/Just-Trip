/* global require module*/
"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, validate: /[a-zA-Z0-9]+/, required: true, unique: true},
    firstname: {type: String, validate: /[a-zA-Z]+/, required: true},
    lastname:{type: String, validate: /[a-zA-Z]+/, required: true},
    age: {type: Number, min:0 , max:150, required: true},
    country: {type:String, required: true},
    city: {type:String, required: true},
    userOfferTours:[{}],
    userBoughtTours:[{}]
});

mongoose.model("user", userSchema);

module.exports = mongoose.model("user");