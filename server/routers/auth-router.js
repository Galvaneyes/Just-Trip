/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, data) {
    const passport = require("passport");
    const authMiddleware = require("../middlewares/auth-middleware");
    const authController = require("../controllers/auth-controller.js")(data);
    const router = express.Router();

    router
        .get("/login", authController.getLoginForm)
        .post("/login", passport.authenticate("local", { failureRedirect: "/fail-to-log-in" }), authController.tryToLogin)
        .get("/logout", authController.userLogout)
        .get("/register", authMiddleware.isNotAuthenticated, authController.getRegisterForm)
        .post("/register",authController.tryToCreateUser);

    app.use("/", router);
};