/* globals module require */
"use strict";

const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");

module.exports = function(app, userData) {
    const router = new express.Router();
    const profileController = require("../controllers/profile-controller.js")(userData);

    router
        .get("/", authMiddleware.isAuthenticated, profileController.getLoggedUserData)
        .get("/edit", (req, res) => {res.send(`<form method="POST" action="/profile"><input type="text" name="firstname"><input type="submit">`)})
        .post("/", authMiddleware.isAuthenticated, profileController.updateUserProfile)
        .get("/:name", profileController.getUserByUsername);

    app.use("/profile", router);
};