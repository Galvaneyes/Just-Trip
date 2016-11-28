/* globals require console */
"use strict";

const config = require("./server/config");
const app = require("./server/config/application");
const data = require("./server/data")(config);
const routers = require("./server/routers")(app, data);

// TEST FOR CREATING AND FINDING
// data.createUser("xxxxx", "no", "name", 14, "Bulgaria", "Sofia")
//     .then(() => {
//         data.getAllUsers()
//     })
//     .then(x => console.log(x));

//console.log(data);s

// require("./server/routers")(app, data);

app.listen(config.port, () => {
    console.log(`Application listen on port: ${config.port}`);
});

