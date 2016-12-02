/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, data) {
    const router = new express.Router();

    const tourController = require("../controllers/tour-controller.js")(data);

    router
        .get("/", tourController.get)
        .get("/result")
        .get("/:id", tourController.getTourById)
        .post("/:id", tourController.postUserInTour);

    app.use("/tours", router);
};