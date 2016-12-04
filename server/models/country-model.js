/* global require module*/
"use strict";

const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    pictureUrl: { type: String, required: false },
    countryUrl: { type: String, required: false },
    city: { type: [], required: false }
});

let Country;
countrySchema.static('getCountry', country => {
    return new Country({
        name: country.name,
        description: country.description,
        pictureUrl: country.pictureUrl,
        countryUrl: country.countryUrl,
        city: country.city
    });
});

mongoose.model("Country", countrySchema);

Country = mongoose.model('Country');

module.exports = mongoose.model("Country");