/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, data) {
    const passport = require("passport");
    const homeController = require("../controllers/home-controller.js")(data);
    const router = express.Router();

    router
        .get("/", homeController.redirectHomePage)
        .get("/home", homeController.loadHomePage);

    app.use("/", router);
};