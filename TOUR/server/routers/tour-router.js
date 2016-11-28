/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, data) {
    const router = new express.Router();

    const tourController = require("../controllers/tour-controller.js")(data);

    router
        .get("/", tourController.get)
        .get("/:id", tourController.getTourById)
        .get("/result");

    app.use("/tours", router);
};