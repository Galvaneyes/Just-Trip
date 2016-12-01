/* global require module*/
"use strict";

const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
    name: {type: String, required: false},    
    description: {type:String, required: false},
    countryUrl: {type:String, required: false}   
});

let Country;
countrySchema.static('getCountry', (country) => {
  return new Country({
    name: country.name,
    description: country.description,
    countryUrl: country.countryUrl    
  });
});

mongoose.model("Country", countrySchema);

Country = mongoose.model('Country');

module.exports = mongoose.model("Country");