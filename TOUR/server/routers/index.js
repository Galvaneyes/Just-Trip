/* globals require module __dirname*/
"use strict";

const fs = require("fs");
const path = require("path");

module.exports = function(app, data) {

    // It finds all properties
    // of the data models and hang them to "data"
    fs.readdirSync("./server/routers")
        .filter(x => x.includes("-router"))
        .forEach(file => {
            require(path.join(__dirname, file))(app, data);
        });
};