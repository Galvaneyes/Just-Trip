/* globals module require */
"use strict";

const express = require("express");

module.exports = function({ app, data }) {
    const router = express.Router();
    const countryController = require("../controllers/country-controller.js")({ data });

    router
        .get("/", countryController.seedCountryData) //updateCountryData
        // .get("/:name", countryController.getCountryByName)
        // .get("/:keyword", countryController.getCountryByKeyword)
        .get("/form", countryController.getAllCountries);
    //getCountryById

    app.use("/countries", router);
};