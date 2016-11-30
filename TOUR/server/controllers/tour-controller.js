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
                            tourTitle : tour.title,
                            tourCountry: tour.country,
                            tourCity : tour.city,
                            currentUsers: tour.getUserCount,
                            capacity: tour.maxUser
                        }
                    };

                    // res.status(200)
                    //     .(tour)
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

                })
        }
    }
}
