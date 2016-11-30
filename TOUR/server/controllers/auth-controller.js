/* globals module require */
"use strict";

const express = require("express");

module.exports = function (app, data) {
    const passport = require("passport");
    const router = express.Router();

    router
        .get("/login", (req, res) => {
            res.status(200).send(`
    <form action="/login" method="POST">
        <input type="text" name="username" placeholder="Username">
        <input type="text" name="password" placeholder="Password">
        <input type="submit" value="Login">
    </form>
    `);
        })
        .post("/login", passport.authenticate("local", { failureRedirect: "/fail-to-log-in" }), (req, res) => {
            res.status(200)
                .json({
                    success: true,
                    message: "i suppose you managed to login, should redirect home after"
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
                    success: true,
                    functionality: "register form if not loged"
                });
        })
        .post("/register", (req, res) => {
            res.status(200)
                .json({
                    success: true,
                    message: "i suppose you managed to register, should redirect login or home after"
                });
        });

    app.use("/auth", router);
}

