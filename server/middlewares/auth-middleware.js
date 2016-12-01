module.exports = {
    isAuthenticated(req, res, next) {
        if(req.isAuthenticated()) {
            next();
        } else {
            const user = {
                user : {
                    isLogged:false
                }
            }

            res.status(401)
                .render("not-login", user);
        }
    },
    isNotAuthenticated(req, res, next) {
        if(req.isAuthenticated()) {
           res.status(301)
                .redirect("/home");
        } else {
            next();
        }
    }
}