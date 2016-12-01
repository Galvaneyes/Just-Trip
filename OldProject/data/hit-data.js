module.exports = function(models) {
    let {
        Hit
    } = models;

    return {
        getAllHits() {
            return new Promise((resolve, reject) => {
                Hit.find((err, hits) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(hits);
                });
            });
        },
        createHit(id,
                url,
                hitDate,
                characteristics,
                searchItemType,
                price,
                username) {}
    };
};