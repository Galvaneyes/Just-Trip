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
                .then(trip => {
                    const isLogged = !!req.user;
                    let isJoined = false;
                    if(isLogged) {
                        isJoined = trip.isUserExist(req.user.username);
                    }

                    const result = {
                        trip: {
                            id: trip._id,
                            creator: trip.creator,
                            headline: trip.headline,
                            country: trip.country,
                            city: trip.city,
                            currentUsers: trip.getUserCount,
                            capacity: trip.maxUser,
                            price: trip.price,
                            description: trip.description,
                            endJoinDate: trip.endJoinDate,
                            beginTripDate: trip.beginTourDate,
                            endTripDate: trip.endTourDate
                        },
                        user: {
                            isLogged,
                            isJoined
                        }
                    };

                    res.status(200)
                        .render("trip-details", result);
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
                                const dataCollection = {
                                    user,
                                    tour
                                };
                                return resolve(dataCollection);
                            })
                            .catch(err => {
                                console.log(err);
                                return reject("User doent exist");
                            });
                    });
                })
                .then(dataCollection => {
                    dataCollection.tour.usersInTour.push(req.body.username);
                    console.log(data);

                    return data.updateTour(dataCollection.tour)
                        .then(tour => {
                            const dataUp = {
                                tour: tour,
                                user: dataCollection.user
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
                .then(dataCollection => {
                    const userTourData = {
                            tourId: dataCollection.tour.getId,
                            tourTitle: dataCollection.tour.headline,
                            tourCountry: dataCollection.tour.country,
                            tourCity: dataCollection.tour.city,
                            isDeleted: "false"
                        };

                    console.log(dataCollection.user);
                    dataCollection.user.userBoughtTours.push(userTourData);

                    return data.updateUser(dataCollection.user);
                })
                .then(model => {

                    res.status(200)
                        .render(model);
                })
                .catch(err => {
                    console.log(err);
                    res.redirect(`/tours/${req.params.id}`);
                });
        },
        getSearchResults(req, res) {

            console.log(req.query);
            const isValid = true;
            const isDeleted = false;
            
            let search = {};

            search.isValid = isValid;
            search.isDeleted = isDeleted;
            if (req.query.city) {
                const string = req.query.city;
                const city = new RegExp(["^", string, "$"].join(""), "i");
                search.city = city;
            }

            if (req.query.country) {
                const string = req.query.country;
                const country = new RegExp(["^", string, "$"].join(""), "i");
                search.country = country;
            }

            if (req.query.start) {
                let date = new Date(`${req.query.start}`);
                // Can change => $gt => $gte
                search.beginTourDate = { $gt: date };
            }

            if (req.query.end) {
                let fixDay = 2;
                let date = new Date(`${req.query.end}`);
                // Can change => $lt => $lte
                date.setDate(date.getDate() + fixDay);

                search.endTourDate = { $lt: date };
            }

            console.log(search.beginTourDate);
            console.log(search.endTourDate);
            data.getSearchResults(search,{}, {sort: { endJoinDate : +1 }})
                .then(tours => {
                    const isLogged = !!req.user;
                    const user = {
                            isLogged: isLogged
                        };

                    res.status(200)
                        .render("search-page",{user, tours});
                })
                .catch(err => {
                    console.log(err);
                    res.status(404)
                        .send("ERROR WHEN SEARCH");
                });
        }
    };
};