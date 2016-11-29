const LocalStrategy = require("passport-local");

module.exports = function (passport, data) {
    const strategy = new LocalStrategy((username, password, done) => {
        data.getUserByCredentials(username, password)
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(err => done(err, false));
    });

    passport.use(strategy);
};