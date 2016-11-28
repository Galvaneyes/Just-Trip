/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, userData) {
    const router = new express.Router();
    const profileController = require("../controllers/profile-controller.js")(userData);

    router
        .get("/", profileController.getLoggedUserData)
        .get("/:name", profileController.getUserByUsername);

    app.use("/profile", router);
};