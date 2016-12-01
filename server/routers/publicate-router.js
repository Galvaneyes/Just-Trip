/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, data) {
    const router = new express.Router();
    const authMiddleware = require("../middlewares/auth-middleware");
    const publicate = require("../controllers/publicate-controller.js")(data);

    router
        .get("/", authMiddleware.isAuthenticated, publicate.get)
        .post("/", publicate.createTour)

    app.use("/publicate", router);
};