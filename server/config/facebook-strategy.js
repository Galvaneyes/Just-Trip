const authConfig = require("./authConfig"),
    FacebookStrategy = require("passport-facebook");

module.exports = function (passport, data) {
    const strategy = new FacebookStrategy({
        clientID: authConfig.facebookAuth.clientID,
        clientSecret: authConfig.facebookAuth.clientSecret,
        callbackURL: authConfig.facebookAuth.callbackURL
    }, function (accessToken, refreshToken, profile, cb) {
        process.nextTick(() => {
            data.getUserByQuery({ facebookId: profile.id })
                .then(user => {
                    if (user) {
                        return cb(null, user);
                    } else {
                        let profileNames = profile.displayName.split(" "),
                            firstName = profileNames.shift(),
                            lastName = profileNames.pop() || "",
                            userName = profile.displayName.replace(/\s/g, '') + authConfig.facebookAuth.usernameSuffix;

                        let newUser = {
                            username: userName,
                            passHash: profile.displayName,
                            salt: profile.id,
                            firstname: firstName,
                            lastname: lastName,
                            facebookId: profile.id,
                            facebookToken: accessToken
                        };

                        console.log("newUser", newUser);

                        data.createUserFromFacebook(newUser)
                            .then(createdUser => {
                                cb(null, createdUser);
                            })
                            .catch(err => {
                                cb(err, false);
                            });
                    }
                })
                .catch(err => cb(err, false));
        });
    });

    passport.use(strategy);
};