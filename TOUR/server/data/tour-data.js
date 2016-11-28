module.exports = function(models) {
    const Tour = models.tour;

    return {
        createTour(tourInfo) {

            return new Promise((resolve, reject) => {

                console.log("CREATING TOUR...");

                Tour.create(tourInfo, (err, tour) => {
                    if (err) {

                        console.log("CAN NOT CREATE TOUR");
                        return reject(err);
                    }

                    console.log("TOUR CREATED!");
                    return resolve(tour);
                });
            });
        },
        getTourByRange(page, size) {
            return new Promise((resolve, reject) => {
                console.log("SEARCHING FOR TOUR COLLECTION...");
                Tour.find()
                    .skip(page * size)
                    .limit(size)
                    .exec((err, tours) => {
                        if (err) {
                            console.log("COLLECTION FROM USERS WAS NOT FOUND");
                            return reject(err);
                        }

                        console.log("COLLECTION FROM USERS WAS FOUND");
                        return resolve(tours);
                    });
            });
        },
        getAllTours() {
            return new Promise((resolve, reject) => {
                console.log("SEARCHING FOR ALL TOURS...");
                Tour.find({}, (err, users) => {
                    if (err) {
                        console.log("ERROR WHEN GET ALL TOURS!");
                        return reject(err);
                    }

                    console.log("TOURS FOUND!");
                    return resolve(users);
                });
            });
        }
    };
}