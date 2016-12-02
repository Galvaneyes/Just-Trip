/* globals module require */
"use strict";

const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");

module.exports = function(app, userData) {
    const router = new express.Router();
    const profileController = require("../controllers/profile-controller.js")(userData);

    router
        .get("/", authMiddleware.isAuthenticated, profileController.getLoggedUserData)
        .post("/", authMiddleware.isAuthenticated, profileController.getLoggedUserData)
        .get("/:name", profileController.getUserByUsername);

    app.use("/profile", router);
};