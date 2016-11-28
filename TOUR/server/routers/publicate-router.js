/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, userData, tourData) {
    const router = new express.Router();
    const publicate = require("../controllers/publicate-controller.js")(userData, tourData);

    router
        .get("/", publicate.get)
        .post("/")

    app.use("/publicate", router);
};