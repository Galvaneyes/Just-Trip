/* globals module require */
"use strict";

module.exports = function ({ data }) {
    return {
        getCityList(req, res) {
            data.getAllCities("name")
                .then(cityList => {
                    //console.log(cityList);
                    res.render("cities-list", { cityList, user: { isLogged: true } });
                })
                .catch(err => {
                    console.log(`CITY LIST ERROR: ${err}`); //is this a descriptive error message
                    res.status(404)
                        .send(`CITY LIST ERROR`);
                });
        },
        getCityListInCountry(req, res) {
            data.getCityListInCountry(req.params.countryName, "name")
                .then(cityList => {
                    //console.log(cityList);
                    res.render("cities-list", { cityList, user: { isLogged: true } });
                })
                .catch(err => {
                    console.log(`CITY LIST ERROR: ${err}`); //is this a descriptive error message
                    res.status(404)
                        .send(`CITY LIST ERROR`);
                });
        },
        getCityDescriptionById(req, res) {
            data.getCityDescriptionById(req.params.id, "description")
                .then(city => {
                    //console.log(cityList);
                    res.send(city.description);
                })
                .catch(err => {
                    console.log(`CITY LIST ERROR: ${err}`); //is this a descriptive error message
                    res.status(404)
                        .send(`CITY LIST ERROR`);
                });

        }


    };
};