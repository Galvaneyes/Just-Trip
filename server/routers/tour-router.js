/* globals module require */
"use strict";

const express = require("express");

module.exports = function({ app, data }) {
    const router = new express.Router();

    const tourController = require("../controllers/tour-controller.js")({ data });

    router
        .get("/", tourController.getSearchResults)
        //.get("/result", tourController.getSearchResults)
        .get("/details/:id", tourController.getTourById)
        .post("/details/:id", tourController.postUserInTour);

    app.use("/tours", router);
};