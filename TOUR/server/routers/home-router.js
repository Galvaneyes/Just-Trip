/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, data) {
    const passport = require("passport");
    const router = express.Router();

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
                .send({
                    success: true, functionality: "login form if not loged O_o"
                });
            })
        .post("/login", passport.authenticate("local", { failureRedirect: "/fail-to-log-in" }), (req, res) => {
            res.status(200)
                .json({
                    success: true, message: "i suppose you managed to login, should redirect home after"
                });
            })
        .get("/logout", (req, res) => {
            req.logout();
            req.session.destroy();

            res.redirect("/fail");
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