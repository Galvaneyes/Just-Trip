/* globals module require */
"use strict";

module.exports = function(tourData) {
    return {
        get(req, res) {
            // MOCK LOGGED
            const isLogged = true;
            if(!isLogged) {
                res.status(401)
                    .send("YOU ARE NOT LOGGED");
            }

            res.status(200)
                .json({
                    success: true, functionality: "shows public information for the tour"
                });
        },
        getTourById(req, res) {
            tourData.getTourById(req.params.id)
                .then(tour => {
                    const result = {
                        result: {
                            id : tour._id,
                            creator: tour.creator,
                            tourTitle : tour.headline,
                            tourCountry: tour.country,
                            tourCity : tour.city,
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
        postUserInTour(req, res){
            tourData.getTourById(req.params.id)
                .then(tour => {
                    return new Promise((resolve, reject) => {
                        if(tour.isUserExist(req.body.username))
                        {
                            return reject("You are already added in tour");
                        }

                        if(tour.getUserCount >= tour.maxUser) {
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
                        userBoughtTours : {
                            tourId: tour._id,
                            tourTitle: tour.headline,
                            tourCountry :tour.country,
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
        }
    }
}
