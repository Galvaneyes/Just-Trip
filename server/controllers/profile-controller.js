/* globals module require */
"use strict";

module.exports = function(userData) {
    return {
        getLoggedUserData(req, res) {
            userData.getUserByUsername(req.user.username)
                .then(user => {
                    const profile = {
                        user : {
                            isLogged:true,
                            userOfferTours: user.userOfferTours,
                            userBoughtTours: user.userBoughtTours
                        }
                    }
                    res.status(200)
                        .render("profile", profile)
                })
                .catch(err => {
                    console.log(`USER ${err} DOESNT EXIST`);
                    res.status(404)
                        .send(`USER ${err} DOESNT EXIST`);
                });
        },
        getUserByUsername(req, res) {
            userData.getUserByUsername(req.params.name)
                .then(user => {
                    res.status(200)
                        .json(user)
                })
                .catch(err => {
                    console.log(`USER ${err} DOESNT EXIST`);
                    res.status(404)
                        .send(`USER ${err} DOESNT EXIST`);
                });
        },
        updateUserProfile(req, res) {
            const username = req.user.username;

            userData.getUserByUsername(username)
                .then(user => {
                    user.firstname = req.body.firstname || user.firstname;
                    user.lastname = req.body.lastname || user.lastname;
                    user.email = req.body.email || user.email;
                    user.city = req.body.city || user.city;
                    user.country = req.body.country || user.country;

                    return userData.updateUser(user);
                })
                .then(user => {
                    console.log(`USER ${user.username} HAS BEEN SUCCESFULLY UPDATED!`);

                    res.redirect(301, "/profile");
                })
                .catch(err => {
                    console.log(`UPDATE FAILED! ${req.user.username}`);
                    res.status(404)
                        .send("PROFILE UPDATE FAILED")
                })
        }
    }
}