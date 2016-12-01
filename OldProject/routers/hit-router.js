/* globals module require */

const express = require("express");

module.exports = function(app, data) {
    let controller = require("../controllers/hit-controller")(data);

    let router = new express.Router();

    router
        .get("/hit", controller.getAll)
        .get("/hit/:id", controller.getById)
        .post("/", controller.create);

    app.use("/hit", router);
};