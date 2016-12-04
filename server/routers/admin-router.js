/* globals module require */
"use strict";

const express = require("express");

module.exports = function({ app, data }) {
    const authMiddleware = require("../middlewares/auth-middleware");
    const adminController = require("../controllers/admin-controller.js")({ data });
    const router = express.Router();

    router
        .get("/admin", authMiddleware.isAuthenticated, authMiddleware.isInRole("admin"), adminController.getAdminPanel);

    app.use("/", router);
}