/* globals module require */
"use strict";

module.exports = function (countryData) {
    const adapter = require("./adapters/tour-site")();
    return {
        updateCountryData(req, res) {
            const isLogged = true;  //for testing purposes
            if (!isLogged) {
                res.status(401)
                    .send("YOU ARE NOT LOGGED");

            } else {

                res.status(200)
                    .json({
                        success: true, functionality: "shows private country information for the country"
                    });
            }
        },

        seedCountryData(req, res) {

            const isLogged = true;  //for testing purposes
            if (!isLogged) {
                res.status(401)
                    .send("YOU ARE NOT LOGGED");

            } else {

                return adapter.getHits(req, res, countryData);
            }
        },
        getCountryByName(req, res) {
            countryData.getCountryByName(req.params.name)
                .then(country => {
                    res.status(200)
                        .json(country)
                })
                .catch(err => {
                    console.log(`COUNTRY ${err} DOESNT EXIST`); //is this a descriptive error message
                    res.status(404)
                        .send(`COUNTRY ${err} DOESNT EXIST`);
                });
        },
        getCountryByKeyword(req, res) {
            countryData.getCountryByKeyWord(req.params.keyword)
                .then(country => {
                    res.status(200)
                        .json(country)
                })
                .catch(err => {
                    console.log(`COUNTRY ${err} DOESNT EXIST`); //is this a descriptive error message
                    res.status(404)
                        .send(`COUNTRY ${err} DOESNT EXIST`);
                });
        }
    }
}
