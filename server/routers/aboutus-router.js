/* globals module require */
"use strict";

const express = require("express");

module.exports = function({ app, data }) {
    const aboutUsController = require("../controllers/aboutus-controller")({ data });
    const router = express.Router();

    router
        .get("/", aboutUsController.loadAboutUsPage);

    app.use("/about-us", router);
};