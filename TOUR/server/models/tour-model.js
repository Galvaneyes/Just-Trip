/* global require module*/
"use strict";

const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
    creator: String,
    title: {type: String, required: true},
    city: {type:String, required: true},
    country:{type:String, required: true},
    description: String,
    maxUser: Number,
    endTourDate: Date,
    isValid: Boolean,
    userOfferTours:[{}],
    userBoughtTours:[{}]
});

mongoose.model("tour", tourSchema);

module.exports = mongoose.model("tour");