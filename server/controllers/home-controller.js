/* globals module require */
"use strict";

module.exports = function () {
    return {
        redirectHomePage(req, res) {
            res.redirect("/home");
        },
        loadHomePage(req, res) {
            const isLogged = !!req.user;

            const user = {
                user : {
                    isLogged:isLogged
                }
            }
            res.render("home-page", user);
        }
    };
}