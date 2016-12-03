/* globals module require */
"use strict";

module.exports = function({ data }) {
    return {
        get(req, res) {
            const isLogged = !!req.user;
            const user = {
                user: {
                    isLogged: isLogged
                }
            };

            res.status(200)
                .render("search-page", user);
        },
        getTourById(req, res) {
            data.getTourById(req.params.id)
                .then(tour => {
                    const result = {
                        result: {
                            id: tour._id,
                            creator: tour.creator,
                            tourTitle: tour.headline,
                            tourCountry: tour.country,
                            tourCity: tour.city,
                            currentUsers: tour.getUserCount,
                            capacity: tour.maxUser
                        }
                    };

                    res.status(200)
                        .render("tourID-addUser", result);
                })
                .catch(err => {
                    console.log(`TOUR ${err} DOESNT EXIST`);
                    res.status(404)
                        .send(`TOUR ${err} DOESNT EXIST`);
                });
        },
        postUserInTour(req, res) {
            data.getTourById(req.params.id)
                .then(tour => {
                    return new Promise((resolve, reject) => {
                        if (tour.isUserExist(req.body.username)) {
                            return reject("You are already added in tour");
                        }

                        if (tour.getUserCount >= tour.maxUser) {
                            return reject("Max users for tour are reached");
                        }

                        data.getUserByUsername(req.body.username)
                            .then(user => {
                                const data = {
                                    user,
                                    tour
                                };
                                return resolve(data);
                            })
                            .catch(err => {
                                console.log(err);
                                return reject("User doent exist");
                            });
                    });
                })
                .then(data => {
                    data.tour.usersInTour.push(req.body.username);

                    return data.updateTour(data.tour)
                        .then(tour => {
                            const dataUp = {
                                tour: tour,
                                user: data.user
                            };
                            console.log(`DATA UP ==> ${dataUp}`);
                            return dataUp;
                        })
                        .catch(err => {
                            // MAY BE IT iS WRONG!
                            console.log(err);
                            return err;
                        });
                })
                .then(data => {
                    const userTourData = {
                        userBoughtTours: {
                            tourId: data.tour._id,
                            tourTitle: data.tour.headline,
                            tourCountry: data.tour.country,
                            tourCity: data.tour.city
                        }
                    };
                    // must be userData!
                    console.log(data.user);
                    data.user.userBoughtTours.push(userTourData);

                    return data.updateUser(data.user);
                })
                .then(model => {
                    res.status(200)
                        .json(model);
                })
                .catch(err => {
                    console.log(err);
                    res.redirect(`/tours/${req.params.id}`);
                });
        },
        getSearchResults(req, res) {

            console.log(req.query);

            let search = {};

            if (req.query.city) {
                search.city = `${req.query.city}`;
            }

            if (req.query.country) {
                search.country = `${req.query.country}`;
            }

            if (req.query.start) {
                let date = new Date(`${req.query.start}`);

                search.beginTourDate = { $gt: date };
            }

            if (req.query.end) {
                let fixDay = 2;
                let date = new Date(`${req.query.end}`);
                date.setDate(date.getDate() + fixDay);

                search.endTourDate = { $lt: date };
            }

            if (Object.keys(search).length === 0) {
                return res.send("SEARCH NOT FOUND");
            }
            console.log(search.beginTourDate);
            console.log(search.endTourDate);
            data.getSearchResults(search)
                .then(tours => {
                    res.status(200)
                        .send(tours);
                })
                .catch(err => {
                    console.log(err);
                    res.status(404)
                        .send("ERROR WHEN SEARCH");
                });
        }
    };
};