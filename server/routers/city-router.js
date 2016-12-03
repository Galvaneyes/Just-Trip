/* globals module require */
"use strict";

const express = require("express");

module.exports = function ({ app, data }) {
    const router = express.Router();
    const cityController = require("../controllers/city-controller.js")({ data });

    router
        .get("/ajax/getDescriptionById/:id", cityController.getCityDescriptionById)
        .get("/ajax/getCityListInCountry/:countryName", cityController.getCityListInCountry)
        .get("/ajax/getCityList", cityController.getCityList);


    app.use("/cities", router);
};