/* globals module require */
"use strict";

module.exports = function({ data }) {
    const adapter = require("./adapters/tour-site")(data);
    return {
        updateCountryData(req, res) {
            const isLogged = true; //for testing purposes
            if (!isLogged) {
                res.status(401)
                    .send("YOU ARE NOT LOGGED");

            } else {

                res.status(200)
                    .json({
                        success: true,
                        functionality: "shows private country information for the country"
                    });
            }
        },

        seedCountryData(req, res) {

            const isLogged = true; //for testing purposes
            if (!isLogged) {
                res.status(401)
                    .send("YOU ARE NOT LOGGED");

            } else {

                return adapter.getHits(req, res);
            }
        },
        getCountryByName(req, res) {
            data.getCountryByName(req.params.name)
                .then(country => {
                    res.status(200)
                        .json(country);
                })
                .catch(err => {
                    console.log(`COUNTRY ${err} DOESNT EXIST`); //is this a descriptive error message
                    res.status(404)
                        .send(`COUNTRY ${err} DOESNT EXIST`);
                });
        },
        getCountryByKeyword(req, res) {
            data.getCountryByKeyWord(req.params.keyword)
                .then(country => {
                    res.status(200)
                        .json(country);
                })
                .catch(err => {
                    console.log(`COUNTRY ${err} DOESNT EXIST`); //is this a descriptive error message
                    res.status(404)
                        .send(`COUNTRY ${err} DOESNT EXIST`);
                });
        },
        getAllCountries(req, res) {
            data.getAllCountries("name")
                .then(countryList => {
                    //console.log(countryList);
                    res.render("country-page", { countryList, user: { isLogged: true } });
                })
                .catch(err => {
                    console.log(`COUNTRY LIST ERROR: ${err}`); //is this a descriptive error message
                    res.status(404)
                        .send(`COUNTRY LIST ERROR`);
                });
        },
        getCountryDescriptionById(req, res) {
            console.log(req.params.id);
            data.getCountryDescriptionById(req.params.id, "description")
                .then(country => {
                    res.send(country.description);
                });
        },
        getCountryList(req, res) {
            console.log(req.params.mask);
            //  res.send("getDescriptioById");
            data.getCountryList(req.params.mask, "name")
                .then(countryList => {
                    console.log(countryList);
                    res.render("country-list", { countryList });
                });
        }
    };
};