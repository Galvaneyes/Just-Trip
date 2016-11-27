/* globals require global module*/
"use strict";

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

module.exports = function(config) {
    // Override mongoose Promise, because it is depricated.
    mongoose.Promise = global.Promise;
    mongoose.connect(config.connectionString);
    const User = require("../models/user-model.js");
    const Tour = require("../models/tour-model.js");
    const models = {User, Tour};
    const data = {};

    // It finds all properties
    // of the data models and hang them to "data"
    fs.readdirSync("./server/data")
        .filter(x => x.includes("-data"))
        .forEach(file => {
            const dataModule = require(path.join(__dirname, file))({ models });

            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
};