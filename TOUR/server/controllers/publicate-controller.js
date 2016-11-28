/* globals module require */
"use strict";

module.exports = function(userData, tourData) {
    return {
        get(req, res) {
            const isLogged = true;
            if(!isLogged) {
                res.status(401)
                    .send("YOU ARE NOT LOGGED");
            }

            res.status(200).render("publicate-form")
                // .json({
                //     success: true, functionality: "GIVE YOU OPTION TO ADD TOUR"
                // });
        },
        createTour(req, res) {
            // tourData.createTour(req.params.id)
            //     .then(tour => {
            //         res.status(200)
            //             .json(tour)
            //     })
            //     .catch(err => {
            //         console.log(`TOUR ${err} DOESNT EXIST`);
            //         res.status(404)
            //             .send(`TOUR ${err} DOESNT EXIST`);
            //     });

            res.send(req.body);
        }
    }
}
