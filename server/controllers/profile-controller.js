/* globals module require */
"use strict";

module.exports = function({ data }) {
    return {
        getLoggedUserData(req, res) {

            //const isLogged = true;
            //if (!isLogged) {
            //    res.status(401)
            //        .send("YOU ARE NOT LOGGED");
            //} else {
            //    res.status(200)
            //        .json({
            //            success: true,
            //            functionality: "shows public information for the user"
            //        });
            //}
            data.getUserByUsername(req.user.username)
                .then(user => {
                    const profile = {
                        user: {
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
                    console.log(`USER ${err} DOESNT EXIST`);
                    res.status(404)
                        .send(`USER ${err} DOESNT EXIST`);
                });
        }
    };
};