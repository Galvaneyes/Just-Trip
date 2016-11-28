/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, data) {

    let router = new express.Router();

    router
        .get("/", (req, res) => {
            res.redirect("/home");
        })
        .get("/home", (req, res) => {
             res.status(200)
                .json({ success: true, functionality: "home page, content soon"
             });
        })
        .get("/login", (req, res) => {
            res.status(200)
                .json({
                    success: true, functionality: "login form if not loged O_o"
                });
            })
        .post("/login", (req, res) => {
            res.status(200)
                .json({
                    success: true, message: "i suppose you managed to login, should redirect home after"
                });
            })
        .get("/register", (req, res) => {
            res.status(200)
                .json({
                    success: true, functionality: "register form if not loged"
                });
            })
        .post("/register", (req, res) => {
            res.status(200)
                .json({
                    success: true, message: "i suppose you managed to register, should redirect login or home after"
                });
            });

    app.use("/", router);
};