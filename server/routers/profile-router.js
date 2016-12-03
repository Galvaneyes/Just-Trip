/* globals module require */
"use strict";

const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");

module.exports = function({ app, data }) {
    const router = new express.Router();
    const profileController = require("../controllers/profile-controller.js")({ data });

    router
        .get("/", authMiddleware.isAuthenticated, profileController.getLoggedUserData)
        .post("/", authMiddleware.isAuthenticated, profileController.getLoggedUserData)
        .get("/:name", profileController.getUserByUsername);

    app.use("/profile", router);
};