/* globals module require */
"use strict";

const express = require("express");

module.exports = function ({ app, data }) {
    const router = express.Router();
    const countryController = require("../controllers/country-controller.js")({ data });

    router
        // .get("/:name", countryController.getCountryByName)
        // .get("/:keyword", countryController.getCountryByKeyword)
        .get("/", countryController.getAllCountries)
        .get("/ajax/getCountryList/:mask", countryController.getCountryList)
        //.get("/", countryController.seedCountryData) //updateCountryData
        .get("/ajax/getDescriptionById/:id", countryController.getCountryDescriptionById);

    app.use("/countries", router);
};