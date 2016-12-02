/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, data) {
    const router = new express.Router();

    const tourController = require("../controllers/tour-controller.js")(data);

    router
        .get("/result", tourController.getSearchResults)
        .get("/", tourController.get)
        .get("/:id", tourController.getTourById)
        .post("/:id", tourController.postUserInTour)

    app.use("/tours", router);
};