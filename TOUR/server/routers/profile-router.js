/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, data) {

    let router = new express.Router();

    router
        .get("/", (req, res) => {
            res.status(200)
                .json({
                    success: true, functionality: "shows public information for the user"
                });
            })
        .get("/:name", (req, res) => {
            res.status(200).json({
                success: true, name: req.params.name, functionality: "shows user profile if loged"
            });
        });

    app.use("/profile", router);
};