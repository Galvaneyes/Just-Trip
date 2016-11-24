module.exports = function (data) {
    return {
        getAll(req, res) {
            data.getAllUsers()
                .then(hit => {
                    res.render("user-list", {
                        result: users
                    });
                });
        },
        getById(req, res) {
            data.getUserById(req.params.id)
                .then(user => {
                    if (user === null) {
                        return res.status(404)
                            .redirect("/error");
                    }

                    return res.render("users-details", {
                        result: user
                    });
                });
        },
        create(req, res) {
            let body = req.body;
            data.createUser(
                body.username,
                body.password,
                body.role,
                body.name,
                body.age,
                body.sex,
                body.location)
                .then(() => {
                    res.redirect("/user");
                });
        }
    };
};