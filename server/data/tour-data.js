module.exports = function(models) {
    const { Tour } = models;

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
        updateTour(tourInfo) {
            return new Promise((resolve, reject) => {
                tourInfo.save((err, tour)=> {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(tour);
                });
            });
        },
        getTourById(tourId) {
            return new Promise((resolve, reject) => {
                console.log(`SEARCHING FOR TOUR WITH ID:${tourId}`);
                Tour.findOne({ _id: tourId }, (err, tour) => {
                    if (err) {
                        console.log("ERROR WHEN CONNECTION TO THE SERVER");
                        return reject(err);
                    }

                    if (!tour) {
                        console.log(`TOUR WITH ${tourId} WAS NOT FOUND`);
                        return reject(tourId);
                    }

                    console.log(`TOUR WITH ${tourId} WAS FOUND`);
                    return resolve(tour);
                });
            });
        },
        // deprecated
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
        // deprecated
        getAllTours() {
            return new Promise((resolve, reject) => {
                console.log("SEARCHING FOR ALL TOURS...");
                Tour.find({}, (err, tours) => {
                    if (err) {
                        console.log("ERROR WHEN GET ALL TOURS!");
                        return reject(err);
                    }

                    console.log("TOURS FOUND!");
                    return resolve(tours);
                });
            });
        },
        // deprecated
        getToursInRangeOfDates(start, end) {
            return new Promise((resolve, reject) => {
                Tour.where("beginTourDate")
                    .gte(start)
                    .where("endTourDate")
                    .lte(end)
                    .exec((err, tours) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(tours);
                    });
            });
        },
        getSearchResults(search) {
            return new Promise((resolve, reject) => {
                console.log("IT STARTTTTT");
                Tour.find(search, (err, tours) => {
                    if (err) {
                        return reject(err);
                    }
                    console.log("===> RESULTS");
                    return resolve(tours);
                });
            });
        }
    };
};