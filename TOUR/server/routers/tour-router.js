/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, tourData) {
    const router = new express.Router();
    const tourController = require("../controllers/tour-controller.js")(tourData);

    router
        .get("/", tourController.get)
        .get("/:id", tourController.getTourById);

    app.use("/tours", router);
};