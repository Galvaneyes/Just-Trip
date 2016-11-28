/* globals require console */
"use strict";

const config = require("./server/config");
const app = require("./server/config/application");
const data = require("./server/data")(config);
require("./server/routers")(app, data);

// TEST FOR CREATING AND FINDING
data.getUserByUsername("admin").then(user => {
    if (!user) {
        data.createUser("admin", "pass", "no@email.com", "no", "name", 14, "Bulgaria", "Sofia");
    }
});

//console.log(data);s

// require("./server/routers")(app, data);

app.listen(config.port, () => {
    console.log(`Application listen on port: ${config.port}`);
});