/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, userData, tourData) {
    const router = new express.Router();
    const profileController = require("../controllers/profile-controller.js")(userData);
    const tourController = require("../controllers/tour-controller.js")(tourData);

    router
        .get("/", tourController.get)
        .post("/")

    app.use("/publicate", router);
};