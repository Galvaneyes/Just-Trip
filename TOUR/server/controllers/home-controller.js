/* globals module require */
"use strict";

module.exports = function () {
    return {
        redirectHomePage(req, res) {
            res.redirect("/home");
        },
        loadHomePage(req, res) {
            res.render("home-page");
        }
    };
}