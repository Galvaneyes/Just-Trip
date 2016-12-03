/* globals module require */
"use strict";

module.exports = function() {
    return {
        loadAboutUsPage(req, res) {
            res.render("about-us");
        }
    };
};