/* globals module require */
"use strict";

module.exports = function(userData) {
    return {
        getLoggedUserData(req, res) {

            const isLogged = true;
            if (!isLogged) {
                res.status(401)
                    .send("YOU ARE NOT LOGGED");
            } else {
                res.status(200)
                    .json({
                        success: true,
                        functionality: "shows public information for the user"
                    });
            }
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
        }
    }
}