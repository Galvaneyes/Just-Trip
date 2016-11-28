/* globals require console */
"use strict";

const config = require("./server/config");
const app = require("./server/config/application");
const data = require("./server/data")(config);
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

data.getUserByUsername(admin.username).then(user => {
    if (!user) {
        data.createUser(admin);
    }
});

//console.log(data);s

// require("./server/routers")(app, data);

app.listen(config.port, () => {
    console.log(`Application listen on port: ${config.port}`);
});