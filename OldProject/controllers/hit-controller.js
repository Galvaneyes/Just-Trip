module.exports = function (data) {
    return {
        getAll(req, res) {
            data.getAllHits()
                .then(hits => {
                    res.render("hit-list", {
                        result: hits
                    });
                });
        },
        getById(req, res) {
            data.getHitById(req.params.id)
                .then(hit => {
                    if (hit === null) {
                        return res.status(404)
                            .redirect("/error");
                    }

                    return res.render("hits-details", {
                        result: hit
                    });
                });
        },
        create(req, res) {
            let body = req.body;
            data.createHit(body.id,
                body.url,
                body.hitDate,
                body.characteristics,
                body.searchItemType,
                body.price,
                body.username)
                .then(() => {
                    res.redirect("/hits");
                });
        }
    };
};