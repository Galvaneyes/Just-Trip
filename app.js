/* globals require console */
"use strict";

const config = require("./server/config");
const data = require("./server/data")(config);
const app = require("./server/config/application")({ data });
const pug = require("pug");
const fs = require("fs");
require("./server/routers")(app, data);

// TEST FOR CREATING AND FINDING
const admin = {
    username: "admin",
    password: "pass",
    email: "no@email.com",
    firstname: "no",
    lastname: "name",
    age: 14,
    country: "Bulgaria",
    city: "Sofia"
};

const tour = {
    creator: "ghost",
    headline: "SPA WEEK IN TELERIK",
    city: "Sofia",
    country: "Bulgaria",
    description: "Code all day, every day!",
    price: 169,
    maxUser: 20,
    endJoinDate: Date.now(),
    beginTourDate: Date.now(),
    endTourDate: Date.now(),
    isValid: true
};

// data.getTourById("583f1af52da8b22fd842ff8a")
//     .then(tourId => {
//         console.log(tourId);
//     })
//     .catch(err => {
//         console.log(err);
//         data.createTour(tour);
//     });

data.getUserByUsername(admin.username)
    .then(user => {
        //console.log(user);
    })
    .catch(err => {
        console.log(err);
        return data.createUser(admin);
    });

// END OF TEST


//COUNTRY TEST
const Bulgaria = {
    name: "Bulgaria",
    description: "Place nice yet misleading info here",
    countryUrl: "I_be_a_proper_url.com"
};

const Murica = {
    name: "Amerikka",
    description: "Why bother with actual info, too many people would hate anyway",
    countryUrl: "freedomIsntFreeNorIsItReal.com"
};

data.getCountryByName("Amerikka")
    .then(country => {
        console.log(country);
    })
    .catch(err => {
        console.log(err);
        data.createCountry(Murica);
    });

//End of country test
app.listen(process.env.PORT || config.port, () => {
    console.log(`Application listen on port: ${config.port}`);
});