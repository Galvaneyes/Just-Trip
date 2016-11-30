/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, countryData) {
    const passport = require("passport"); 
    const router = express.Router();
    const countryController = require("../controllers/country-controller.js")(countryData);

    router
    .get("/", countryController.seedCountryData)  //updateCountryData
    .get("/:name", countryController.getCountryByName)
    .get("/:keyword", countryController.getCountryByKeyword);          
    //getCountryById

    app.use("/countries", router);
};