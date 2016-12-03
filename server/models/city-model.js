/* global require module*/
"use strict";

const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
    name: { type: String, required: false },
    description: { type: String, required: false },
    pictureUrl: { type: String, required: false },
    cityUrl: { type: String, required: false },
    country:{type: {},required:false}
});

let City;
citySchema.static('getCity', city => {
    return new City({
        name: city.name,
        description: city.description,
        pictureUrl: city.pictureUrl,
        cityUrl: city.cityUrl,
        country: city.country
    });
});

mongoose.model("City", citySchema);

City = mongoose.model('City');

module.exports = mongoose.model("City");