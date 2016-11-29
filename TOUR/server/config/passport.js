const passport = require("passport");
    // LocalStrategy = require("passport-local").Strategy;


module.exports = function ({ app, data }) {
    // passport setup
    require("./local-strategy")(passport, data);
    app.use(passport.initialize());
    app.use(passport.session());

    // const strategy = new LocalStrategy((username, password, done) => {
    //     data.getUserByCredentials(username, password)
    //         .then(user => {
    //             if (user) {
    //                 return done(null, user);
    //             }

    //             return done(null, false);
    //         })
    //         .catch(err => done(err, false));
    // });

    // passport.use(strategy);

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