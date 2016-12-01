const LocalStrategy = require("passport-local"),
    encrypt = require('../../utils/encrypt');


function authenticate(user, pswd) {
    return encrypt.hashPassword(user.salt, pswd) === user.passHash;
}

module.exports = function(passport, data) {
    const strategy = new LocalStrategy((username, password, done) => {
        data.getUserByUsername(username)
            .then(user => {
                if (user && authenticate(user, password)) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(err => done(err, false));
    });

    passport.use(strategy);
};