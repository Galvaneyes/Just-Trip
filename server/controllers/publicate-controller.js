/* globals module require */
"use strict";

module.exports = function(data) {
    return {
        get(req, res) {
            const isLogged = !!req.user;

            if (!isLogged) {
                res.status(401)
                    .send("YOU ARE NOT LOGGED");
            } else {
                const user = {
                user : {
                    isLogged:isLogged
                }
            }
                res.status(200).render("publish-travel", user)
            }
        },
        createTour(req, res) {
            // MOCK USER 
            if(!req.user) {
                return res.status(401)
                        .send("You are not logged")
            }

            const toursDetails = req.body;
            toursDetails.isValid = "true";
            const user = req.user.username;
            toursDetails.creator = user;

            data.createTour(toursDetails)
                .then(tour => {
                    const userTourData = {
                        userOfferTours : {
                            tourId: tour._id,
                            tourTitle: tour.headline,
                            tourCountry :tour.country,
                            tourCity: tour.city
                        }
                    };

                    return data.updateUserProperty(user, userTourData);
                })
                .then(model => {
                    res.status(200)
                    .json(model);
                })
                .catch(err => {
                    console.log(`TOUR ${err} CANT BE CREATED`);
                    res.status(404)
                        .send(`TOUR ${err} CANT BE CREATED`);
                });
        }
    }
}
