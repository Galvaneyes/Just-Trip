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
    country:"Lolo",
    description: "Puskaite seeeee",
    maxUser: 20,
    endTourDate: Date.now(),
    isValid: true
};


data.getTourById("583c505014894a0c90f514ca")
    .then(tour => {
        if(!tour) {
            data.createTour(tour);
        }
    })
    .then(() => {
        data.getUserByUsername(admin.username).then(user => {
            if (!user) {
                data.createUser(admin);
            }
        });
    })

// END OF TEST

app.listen(config.port, () => {
    console.log(`Application listen on port: ${config.port}`);
});