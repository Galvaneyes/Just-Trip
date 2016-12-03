/* globals module require */
"use strict";

module.exports = function({ data, io }) {
    return {
        get(req, res) {

            if (!req.user) {
                res.status(401)
                    .render("not-login");
            } else {
                const user = {
                    user: {
                        isLogged: !!req.user
                    }
                };
                res.status(200).render("publish-travel", user);
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
        },
        // UNDERCONSTRUCTION!!
        removeTour(req, res) {
            if (!req.user) {
                return res.status(401)
                    .render("not-login");
            }

            console.log(req.params.id);
            data.getTourById(req.params.id)
                .then(tour => {
                    console.log("REQESTER ====> " + req.user.username);
                    console.log("CREATOR =====> " + tour.creator);
                    if (req.user.username !== tour.creator) {
                        res.send("NOT AUTHORIZED")
                    }

                    // const searchParams = {
                    //     userBoughtTours.tourId: {
                    //         $in : [ {tourId : req.params.id}]
                    // }};

                    return data.getSearchResults({ userBoughtTours: { $elemMatch: { tourCity: "Sofia" } } });
                })
                .then(users => {
                    // const newUsers = users.filter(x => x.userBoughtTours["tourId"] === `${req.params.id}` )
                    console.log("FIRST ===>" + users);
                    // console.log("RESULTS ====>" + newUsers);
                    res.send(users);
                })
                .catch(err => {
                    console.log("ERROOOOR =====>" + err);
                    res.send(err);
                });
        }
    };
};