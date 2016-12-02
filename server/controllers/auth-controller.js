/* globals module require */
"use strict";

module.exports = function() {
    return {
        getLoginForm(req, res) {
            res.status(200)
                .render("login-page");
            // .send(`
            // <form action="/login" method="POST">
            //     <input type="text" name="username" placeholder="Username">
            //     <input type="text" name="password" placeholder="Password">
            //     <input type="submit" value="Login">
            // </form>
            // `);
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
            }
            res.status(200)
                .render("register", user);
        },
        tryToCreateUser(req, res) {
            res.status(200)
                .json({
                    success: true,
                    message: "i suppose you managed to register, should redirect login or home after"
                });
        }
    };
}