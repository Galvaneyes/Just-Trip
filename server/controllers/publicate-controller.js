/* globals module require */
"use strict";

module.exports = function({ data, io }) {
    return {
        get(req, res) {
            const isLogged = !!req.user;

            if (!isLogged) {
                res.status(401)
                    .send("YOU ARE NOT LOGGED");
            } else {
                const user = {
                    user: {
                        isLogged: isLogged
                    }
                };
                res.status(200).render("publish-travel", user);
            }
        },
        createTour(req, res) {

            if (!req.user) {
                return res.status(401)
                    .send("You are not logged");
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
            req.body.endTourDate = endTourDate

            const toursDetails = req.body;
            toursDetails.isValid = "true";

            const user = req.user.username;
            toursDetails.creator = user;

            data.createTour(toursDetails)
                .then(tour => {
                    const userTourData = {
                        userOfferTours: {
                            tourId: tour._id,
                            tourTitle: tour.headline,
                            tourCountry: tour.country,
                            tourCity: tour.city
                        }
                    };

                    return data.updateUserProperty(user, userTourData);
                })
                .then(({ updatedUser, tour }) => {
                    io.sockets.emit('newTour', {
                        headline: `${toursDetails.headline}`,
                        country: `${toursDetails.country}`,
                        city: `${toursDetails.city}`,
                        date: `${toursDetails.beginTourDate}`,
                        tourId: `${tour.tourId}`,
                        creator: `${user}`
                    });
                    res.status(200)
                        .json(updatedUser);
                })
                .catch(err => {
                    console.log(`TOUR ${err} CANT BE CREATED`);
                    res.status(404)
                        .send(`TOUR ${err} CANT BE CREATED`);
                });
        }
    };
};