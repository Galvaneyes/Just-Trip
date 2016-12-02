/* globals module require */
"use strict";

module.exports = function(tourData) {
    return {
        get(req, res) {
            // MOCK LOGGED
            const isLogged = true;
            if (!isLogged) {
                res.status(401)
                    .send("YOU ARE NOT LOGGED");
            }

            res.status(200)
                .render("search-page")
        },
        getTourById(req, res) {
            tourData.getTourById(req.params.id)
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
                        .render("tourID-addUser", result)
                })
                .catch(err => {
                    console.log(`TOUR ${err} DOESNT EXIST`);
                    res.status(404)
                        .send(`TOUR ${err} DOESNT EXIST`);
                });
        },
        postUserInTour(req, res) {
            tourData.getTourById(req.params.id)
                .then(tour => {
                    return new Promise((resolve, reject) => {
                        if (tour.isUserExist(req.body.username)) {
                            return reject("You are already added in tour");
                        }

                        if (tour.getUserCount >= tour.maxUser) {
                            return reject("Max users for tour are reached");
                        }

                        return resolve(tour);
                    });
                })
                .then(tour => {
                    tour.usersInTour.push(req.body.username);

                    return tourData.updateTour(tour);
                })
                .then(tour => {
                    const userTourData = {
                        userBoughtTours: {
                            tourId: tour._id,
                            tourTitle: tour.headline,
                            tourCountry: tour.country,
                            tourCity: tour.city
                        }
                    };
                    // must be userData!
                    console.log(req.body.username);
                    return tourData.updateUserArrayProperty(req.body.username, userTourData);
                })
                .then(model => {
                    res.status(200)
                        .json(model)
                })
                .catch(err => {
                    console.log(err);
                    res.redirect(`/tours/${req.params.id}`)
                })
        },
        getSearchResults(req, res) {

            console.log(req.query);

            let search = {};

            if(req.query.city) {
                search.city = `${req.query.city}`;
            }
            if(req.query.country) {
                search.country = `${req.query.country}`;
            }

            if(req.query.start) {
                let date = new Date(`${req.query.start}`);

                search.beginTourDate= {$gt: date}
            }
            if(req.query.end) {
                let date = new Date(`${req.query.end}`);

                search.endTourDate= {$lt: date}
            }

            tourData.getSearchResults(search)
                .then(tours => {
                    res.status(200)
                        .send(tours);
                })
                .catch(err => {
                    res.status(404)
                        .send("ERROR WHEN SEARCH")
                })
        }
    }
}