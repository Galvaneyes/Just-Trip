/* globals module require */
"use strict";

module.exports = function({ data, io }) {
    const validator = require("../../utils/validator");
    return {
        get(req, res) {

            if (!req.user) {
                res.status(401)
                    .render("not-login");
            } else {
                Promise.all([data.getAllCountries("name"), data.getAllCities("name")])
                    .then(([countries, cities]) => {
                        const user= {
                                isLogged: !!req.user
                            }

                        res.status(200)
                            .render("publish-travel", { user, countries, cities });
                    });
            }
        },
        createTour(req, res) {

            if (!req.user) {
                return res.status(401)
                    .render("not-login");
            }

            const fixDay = 1;
            let endJoinDate = new Date(`${req.body.endJoinDate}`);
            endJoinDate.setDate(endJoinDate.getDate() + fixDay);
            req.body.endJoinDate = endJoinDate;

            let beginTourDate = new Date(`${req.body.beginTourDate}`);
            beginTourDate.setDate(beginTourDate.getDate() + fixDay);
            req.body.beginTourDate = beginTourDate;

            let endTourDate = new Date(`${req.body.endTourDate}`);
            endTourDate.setDate(endTourDate.getDate() + fixDay);
            req.body.endTourDate = endTourDate;

            // TODO: ajax! ==> TO UGLY!
            if (!validator.validateString(req.body.headline, 1)) {
                res.status(400).send("Headline is required!");
            } else if (!validator.validateString(req.body.country, 1)) {
                res.status(400).send("Country is required!");
            } else if (!validator.validateString(req.body.city, 1)) {
                res.status(400).send("City is required!");
            } else if (!validator.validateString(req.user.username, 1)) {
                res.status(400).send("You must be loged in to publish!");
            } else {
                // TO DO: IT IS NOT CORRECT
                const user = req.user.username;
                const toursDetails = {
                    headline: validator.escapeHtml(req.body.headline),
                    country: validator.escapeHtml(req.body.country),
                    city: validator.escapeHtml(req.body.city),
                    endJoinDate:endJoinDate,
                    beginTourDate: beginTourDate,
                    endTourDate: endTourDate,
                    maxUser: req.body.maxUser,
                    price : req.body.price,
                    description: validator.escapeHtml(req.body.description),
                    creator: validator.escapeHtml(user),
                    isValid: "true",
                    isDeleted: "false"
                };
                data.createTour(toursDetails)
                    .then(tour => {
                        const userTourData = {
                            userOfferTours: {
                                tourId: tour.getId,
                                tourTitle: tour.headline,
                                tourCountry: tour.country,
                                tourCity: tour.city,
                                isDeleted: "false"
                            }
                        };
                        return data.updateUserProperty(user, userTourData);
                    })
                    .then(({ username, tour }) => {
                        io.sockets.emit('newTour', {
                            headline: `${toursDetails.headline}`,
                            country: `${toursDetails.country}`,
                            city: `${toursDetails.city}`,
                            date: `${toursDetails.beginTourDate}`,
                            tourId: `${tour.tourId}`,
                            creator: `${username}`
                        });

                        const user = {
                                user: {isLogged : true,
                                tourId : tour.tourId
                            }
                        }

                        res.status(200)
                            .render("success-publish", user);
                    })
                    .catch(err => {
                        console.log(`TOUR ${err} CANT BE CREATED`);
                        res.status(404)
                            .send(`TOUR ${err} CANT BE CREATED`);
                    });
            }
        },
        // UNDERCONSTRUCTION!!
        removeTour(req, res) {
            if (!req.user) {
                return res.status(401)
                    .render("not-login");
            }

            const tourId = req.params.id;

            data.getTourById(tourId)
                .then(tour => {
                    if (req.user.username !== tour.creator) {
                        res.send("NOT AUTHORIZED");
                    }
                    tour.isDeleted = "true";
                    tour.isValid = "false";

                    return data.updateTour(tour)
                })
                .then(updatedTour => {
                    console.log("UPDATED TOUR======>" + updatedTour.headline);
                    return data.getUserByUsername(updatedTour.creator);
                })
                .then(tourCreator => {
                    console.log("CREATOR OF TOUR====>" + tourCreator.username);
                    tourCreator.userOfferTours.forEach(tour => {
                            if(tour.tourId == `${req.params.id}`) {
                                tour.isDeleted = "true";
                                return;
                            }
                        })
                    return data.updateUserFields(tourCreator.username, {userOfferTours:tourCreator.userOfferTours})})
                .then(() => {
                        const search = {
                        userBoughtTours: {
                            $elemMatch: { tourId: `${req.params.id}`
                                }
                            }
                        };

                        return data.getUsersBySpecificCriteria(search);
                    })
                .then(users => {
                    users.forEach(x => {
                        x.userBoughtTours.forEach(tour => {
                            if(tour.tourId == `${req.params.id}`) {
                                tour.isDeleted = "true";
                                return;
                            }
                        })
                    });
                    return Promise.resolve(users)
                })
                .then(users => {
                    return Promise.all(users.map(user => data.updateUserFields(user.username, {userBoughtTours:user.userBoughtTours})));
                })
                .then(result => {
                        res.send(result);
                    })
                .catch(err => {
                    console.log("ERROOOOR =====>" + err);
                    res.send(err);
                });
        }
    };
};