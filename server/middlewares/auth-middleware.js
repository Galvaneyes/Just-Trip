module.exports = {
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            const user = {
                user: {
                    isLogged: false
                }
            };

            res.status(401)
                .render("not-login", user);
        }
    },
    isInRole(role) {
        return (req, res, next) => {
            if(req.user && req.user.roles.indexOf(role) !== -1) {
                next();
            } else {
                res.status(401).redirect("/home");
            }
        }
    },
    isNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            res.status(301)
                .redirect("/home");
        } else {
            next();
        }
    }
};