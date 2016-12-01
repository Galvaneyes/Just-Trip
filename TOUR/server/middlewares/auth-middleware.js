module.exports = {
    isAuthenticated(req, res, next) {
        if(req.isAuthenticated()) {
            next();
        } else {
            res.status(401).json({
                    success: false,
                    message: 'Not authorized!'
                });
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