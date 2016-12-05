/* globals module require */
"use strict";

module.exports = function({ data }) {
    const validator = require("../../utils/validator");
    return {
        getLoginForm(req, res) {
            res.status(200)
                .render("login-page");

        },
        tryToLogin(req, res) {
            res.status(301)
                .redirect("/home");
        },
        facebookLogin(req, res) {
            res.status(301).redirect("/home");
        },
        userLogout(req, res) {
            req.logout();
            req.session.destroy();
            res.redirect("/home");
        },
        getRegisterForm(req, res) {
            const isLogged = !!req.user;

            const user = {
                user: {
                    isLogged: isLogged
                }
            };
            res.status(200)
                .render("register", user);
        },
        tryToCreateUser(req, res) {

            if (!validator.validateString(req.body.username)) {
                res.status(400).send("Username must be string and atleast 3 characters!");
            } else if (!validator.validateString(req.body.firstname, 2)) {
                res.status(400).send("Firstname must be string and atleast 3 characters!");
            } else if (!validator.validateString(req.body.lastname, 2)) {
                res.status(400).send("Lastname must be string and atleast 3 characters!");
            } else if (!validator.validatePassword(req.body.password)) {
                res.status(400).send("Password must be atleast 3 characters long and contain atleast 1 letter and atleast 1 digit!");
            } else {
                const user = {
                    username: validator.escapeHtml(req.body.username),
                    email: validator.escapeHtml(req.body.email),
                    password: validator.escapeHtml(req.body.password),
                    firstname: validator.escapeHtml(req.body.firstname),
                    lastname: validator.escapeHtml(req.body.lastname),
                    age: validator.escapeHtml(req.body.age),
                    country: validator.escapeHtml(req.body.country),
                    city: validator.escapeHtml(req.body.city)
                };

                data.createUser(user)
                    .then(() => {
                        res.redirect(307, "/login");
                    })
                    .catch(err => {
                        res.status(404)
                            .send(`REGISTER FAIL, TRY AGAIN ===>${err}`);
                    });
            }
        }
    };
};