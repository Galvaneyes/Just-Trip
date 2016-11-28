/* global require module*/
"use strict";

const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
    name: {type: String, required: true},    
    desctiption: {type:String, required: true},
    countryUrl: {type:String, required: true}   
});

mongoose.model("country", countrySchema);

module.exports = mongoose.model("country");