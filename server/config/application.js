/* globals module require */
"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

module.exports = function({ data }) {
    const app = express();
    const rootPath = path.join(__dirname, "/../../");
    //app.use('/static', express.static(path.resolve(__dirname + '/../../public')));

    app.set("view engine", "pug");
    app.set("views", path.join(rootPath, "server/views/"));
    app.use("/", express.static(path.join(rootPath, "public")));
    app.use("/static", express.static(path.join(rootPath, "public")));
    app.use("/tours", express.static(path.join(rootPath, "public")));
    app.use("/tours/static", express.static(path.join(rootPath, "public")));
    app.use("/tours/details/static", express.static(path.join(rootPath, "public")));
    //app.use("/static", express.static("../../public"));

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({ secret: "purple unicorn" }));

    require("./passport")({ app, data });

    const server = require('http').createServer(app);

    return { app, server };
};