/* globals module require */
"use strict";

const express = require("express");

module.exports = function({ app }) {

    let router = new express.Router();

    router
        .get("/", (req, res) => {
            res.status(200)
                .json({
                    success: true,
                    functionality: "link all destinations"
                });
        })
        .get("/:id", (req, res) => {
            res.status(200)
                .json({
                    success: true,
                    name: req.params.id,
                    functionality: "shows detailed information for the distination"
                });
        });

    app.use("/destination", router);
};