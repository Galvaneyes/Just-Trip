/* globals module require */
"use strict";

module.exports = function ({ data }) {
    const adapter1 = require("./adapters/tour-site")(data);
    const adapter2 = require("./adapters/travel-site")(data);

    return {
        updateCountryData(req, res) {
            const isLogged = !!req.user;  //perhaps admin
            if (!isLogged) {
                res.status(401)
                    .send("YOU ARE NOT LOGGED"); //admin

            } else {

                res.status(200)
                    .json({
                        success: true,
                        functionality: "shows private country information for the country"
                    });
            }
        },

        seedCountryData(req, res) {

            const isLogged = !!req.user;
            if (!isLogged) {
                res.status(401)
                    .send("YOU ARE NOT LOGGED");

            } else {
                if (req.params.i === "1") {
                    return adapter1.getHits(req, res);
                } else if (req.params.i === "2") {
                    return adapter2.getHits(req, res);
                } else {
                    console.log(`INCORRECT CRAWL NUMBER`);
                    res.status(404)
                        .send(`INCORRECT CRAWL NUMBER ${req.params.i}`);
                }

            }
        },

        getCountryByName(req, res) {
            data.getCountryByName(req.params.name)
                .then(country => {
                    res.status(200)
                        .json(country);
                })
                .catch(err => {
                    console.log(`COUNTRY ${err} DOESN'T EXIST`);
                    res.status(404)
                        .send(`COUNTRY ${err} DOESN'T EXIST`);
                });
        },
        getCountryByKeyword(req, res) {
            data.getCountryByKeyWord(req.params.keyword)
                .then(country => {
                    res.status(200)
                        .json(country);
                })
                .catch(err => {
                    console.log(`COUNTRY ${err} DOESN'T EXIST`);
                    res.status(404)
                        .send(`COUNTRY ${err} DOESN'T EXIST`);
                });
        },
        getAllCountries(req, res) {
            data.getAllCountries("name")
                .then(countryList => {
                    res.render("country-page", { countryList, user: { isLogged: !!req.user } });
                })
                .catch(err => {
                    console.log(`COUNTRY LIST ERROR: ${err}`);
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
            data.getCountryList(req.params.mask, "name")
                .then(countryList => {
                    console.log(countryList);
                    res.render("country-list", { countryList, user: { isLogged: !!req.user } });
                });
        }
    };
};