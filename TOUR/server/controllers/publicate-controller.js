/* globals module require */
"use strict";

module.exports = function(data) {
    return {
        get(req, res) {
            const isLogged = true;
            if (!isLogged) {
                res.status(401)
                    .send("YOU ARE NOT LOGGED");
            } else {
                res.status(200).render("publicate-form")
                    // .json({
                    //     success: true, functionality: "GIVE YOU OPTION TO ADD TOUR"
                    // });
            }
        },
        createTour(req, res) {
            const toursDetails = req.body;
            // MOCK USER 
            toursDetails.creator = "admin";
            console.log(toursDetails);

            data.createTour(toursDetails)
                .then(tour => {
                    const userTourData = {
                        userOfferTours : {
                            tourId: tour._id,
                            tourCountry :tour.country,
                            tourCity: tour.city
                        }
                    };

                    return data.updateUserArrayProperty("admin", userTourData);
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
