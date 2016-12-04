/* globals module */

module.exports = {
    port: process.env.PORT || 3001,

    connectionString: process.env.CONNECTION_STRING || "mongodb://localhost/TOURings"
};

// connectionString: "mongodb://admin:team@ds113938.mlab.com:13938/tourings"
// mongodb://<dbuser>:<dbpassword>@ds113938.mlab.com:13938/tourings
// connectionString: "mongodb://localhost/TOURings"
// TeamBlackObelisk -> BlackObelisk -> team1234