/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, data) {
    const router = new express.Router();
    const publicate = require("../controllers/publicate-controller.js")(data);

    router
        .get("/", publicate.get)
        .post("/", publicate.createTour)

    app.use("/publicate", router);
};