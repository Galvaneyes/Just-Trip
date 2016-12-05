/* globals require console */
"use strict";

const config = require("./server/config");
const data = require("./server/data")(config);
const { app, server } = require("./server/config/application")({ data });
let io = require("./server/config/sockets")({ server });
require("./server/routers")({ app, data, io });

server.listen(config.port, () => {
    console.log(`Application listen on port: ${config.port}`);
});