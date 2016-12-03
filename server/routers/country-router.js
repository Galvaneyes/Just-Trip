/* globals module require */
"use strict";

const express = require("express");

module.exports = function ({ app, data }) {
    const router = express.Router();
    const countryController = require("../controllers/country-controller.js")({ data });

    router
        // .get("/:name", countryController.getCountryByName)
        // .get("/:keyword", countryController.getCountryByKeyword)
        .get("/list", countryController.getAllCountries)
        .get("/", countryController.seedCountryData) //updateCountryData
        .get("/ajax/getDescriptioById/:id", countryController.getDescriptioById);
    //getCountryById

    app.use("/countries", router);
};