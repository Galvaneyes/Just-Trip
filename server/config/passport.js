const passport = require("passport");


module.exports = function ({ app, data }) {
    // passport setup
    require("./local-strategy")(passport, data);
    require("./facebook-strategy")(passport, data);

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser((id, done) => {
        data.getUserById(id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(err => done(err, false));
    });
};