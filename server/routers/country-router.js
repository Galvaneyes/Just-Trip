/* globals module require */
"use strict";

const express = require("express");

module.exports = function ({ app, data }) {
    const router = express.Router();
    const countryController = require("../controllers/country-controller.js")({ data });

    router
        .get("/", countryController.getAllCountries)
        .get("/ajax/getCountryList/:mask", countryController.getCountryList)
        .get("/ajax/getCountryDetail/:id", countryController.getCountryDetail)
        .post("/ajax/setCountryDetail/", countryController.setCountryDetail)
        .post("/ajax/removeCountry/", countryController.removeCountry)
        .get("/crawl/:i", countryController.seedCountryData)
        .get("/ajax/getDescriptionById/:id", countryController.getCountryDescriptionById);

    app.use("/countries", router);
};