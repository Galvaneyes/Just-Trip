/* globals require console */
"use strict";

const config = require("./server/config");
const app = require("./server/config/application");
const data = require("./server/data")(config);

data.createUser().then(()=>{
});

//console.log(data);

// require("./server/routers")(app, data);

// app.listen(config.port, ()=> {
//     console.log(`Application listen on port: ${config.port}`);
// });

