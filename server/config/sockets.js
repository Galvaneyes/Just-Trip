/* globals require */

module.exports = function({ server }) {
    let io = require("socket.io")(server);
    return io;
};