/* globals require console */
"use strict";

const config = require("./server/config");
const data = require("./server/data")(config);
const app = require("./server/config/application")({ data });
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
    title: "Ebatti eskurziqta",
    city: "BambBu",
    country: "Lolo",
    description: "Puskaite seeeee",
    maxUser: 20,
    endTourDate: Date.now(),
    isValid: true
};

data.getTourById("583d42b30d185c440861d6b1")
    .then(tourId => {
        console.log(tourId);
    })
    .catch(err => {
        console.log(err);
        data.createTour(tour);
    });

data.getUserByUsername(admin.username)
    .then(user => {
        console.log(user);
    })
    .catch(err => {
        console.log(err);
        data.createUser(admin);
    });

// END OF TEST

app.listen(process.env.PORT || config.port, () => {
    console.log(process.env.PORT);
    console.log(`Application listen on port: ${config.port}`);
});