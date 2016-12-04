/* globals module require */
"use strict";

module.exports = function ({ data }) {
    return {
        getCityList(req, res) {
            data.getAllCities("name")
                .then(cityList => {
                    res.render("cities-list", { cityList, user: { isLogged: true } });
                })
                .catch(err => {
                    console.log(`City list error: ${err}`);
                    res.status(404)
                        .send(`City list error`);
                });
        },
        getCityListInCountry(req, res) {
            data.getCityListInCountry(req.params.countryName, "name")
                .then(cityList => {
                    res.render("cities-list", { cityList, user: { isLogged: true } }); //for testing purposes
                })
                .catch(err => {
                    console.log(`City list error: ${err}`);
                    res.status(404)
                        .send(`City list error`);
                });
        },
        getCityDescriptionById(req, res) {
            data.getCityDescriptionById(req.params.id, "description")
                .then(city => {
                    res.send(city.description);
                })
                .catch(err => {
                    console.log(`City list error: ${err}`);
                    res.status(404)
                        .send(`City list error`);
                });
        }
    };
};