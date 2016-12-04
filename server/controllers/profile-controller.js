/* globals module require */
"use strict";

module.exports = function({ data }) {
    return {
        getLoggedUserData(req, res) {
            data.getUserByUsername(req.user.username)
                .then(user => {
                    const profile = {
                        user: {
                            username: user.username,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            email: user.email,
                            isLogged: true,
                            userOfferTours: user.userOfferTours,
                            userBoughtTours: user.userBoughtTours
                        }
                    };
                    res.status(200)
                        .render("profile", profile);
                })
                .catch(err => {
                    console.log(`USER ${err} DOESNT EXIST`);
                    res.status(404)
                        .send(`USER ${err} DOESNT EXIST`);
                });
        },
        getUserByUsername(req, res) {
            data.getUserByUsername(req.params.name)
                .then(user => {
                    res.status(200)
                        .json(user);
                })
                .catch(err => {
                    console.log(`USER ${err} DOESN'T EXIST`);
                    res.status(404)
                        .send(`USER ${err} DOESN'T EXIST`);
                });
        },
        updateUserProfile(req, res) {
            const username = req.user.username;

            data.getUserByUsername(username)
                .then(user => {
                    user.firstname = req.body.firstname || user.firstname;
                    user.lastname = req.body.lastname || user.lastname;
                    user.email = req.body.email || user.email;
                    user.city = req.body.city || user.city;
                    user.country = req.body.country || user.country;

                    return data.updateUser(user);
                })
                .then(user => {
                    console.log(`USER ${user.username} HAS BEEN SUCCESFULLY UPDATED!`);

                    res.redirect(301, "/profile");
                })
                .catch(err => {
                    console.log(`UPDATE FAILED! ${req.user.username} :${err}`);
                    res.status(404)
                        .send("PROFILE UPDATE FAILED");
                });
        }
    };
};