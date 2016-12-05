/* globals module require */
"use strict";

module.exports = function({ data }) {
    return {
        getAdminPanel(req, res) {
            res.status(200).json({success: true, message: "Welcome to the admin panel"});
        }
    };
};
