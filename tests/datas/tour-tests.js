/* globals describe it beforeEach afterEach */

const chai = require("chai");
const sinonModule = require("sinon");

let expect = chai.expect;

describe("Tour data", () => {
    let sinon;

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    class Tour {
        constructor(properties) {
            this.creator = properties.creator;
            this.headline = properties.headline;
            this.city = properties.city;
            this.country = properties.country;
            this.description = properties.description;
            this.price = properties.price;
            this.maxUser = properties.maxUser;
            this.endJoinDate = properties.endJoinDate;
            this.beginTourDate = properties.beginTourDate;
            this.endTourDate = properties.endTourDate;
            this.isValid = properties.isValid;
            this.usersInTour = properties.usersInTour;
        }

        save() {

        }
        static create() {}
        static find() {}
        static findOne() {}
    }

    let data = require("../../server/data/tour-data")({
        Tour
    });

    let errorMsg = "error";

    describe("createTour()", () => {
        afterEach(() => {
            sinon.restore();
        });

        let tourInfo = {
            headline: "Na gosti na Pesho"
        };

        it("Expect to create tour with the given information", done => {
            sinon.stub(Tour, "create", (tour, cb) => {
                cb(null, tour);
            });

            data.createTour(tourInfo)
                .then(expectedTour => {
                    expect(expectedTour).to.eqls(tourInfo);
                    done();
                });
        });

        it("Expect to reject if tour is not created", done => {
            let error = "Error";
            sinon.stub(Tour, "create", (tour, cb) => {
                cb(error, tour);
            });

            data.createTour(tourInfo).catch(err => {
                expect(err).to.equals(error);
                done();
            });
        });
    });

    describe("updateTour()", () => {
        afterEach(() => {
            sinon.restore();
        });

        let tourInfo = {
            headline: "Na gosti na Pesho"
        };

        it("Expect to update tour correctly", done => {
            sinon.stub(Tour.prototype, "save", cb => {
                cb(null);
            });

            let mockedTour = new Tour(tourInfo);

            data.updateTour(mockedTour).then(expectedTour => {
                expect(expectedTour.headline).to.equals(tourInfo.headline);
                done();
            });
        });

        it("Expect to reject if fails to update tour", done => {
            sinon.stub(Tour.prototype, "save", cb => {
                cb(errorMsg);
            });

            let mockedTour = new Tour(tourInfo);

            data.updateTour(mockedTour)
                .catch(err => {
                    expect(err).to.equals(errorMsg);
                    done();
                });
        });
    });

    describe("getTourById()", () => {
        afterEach(() => {
            sinon.restore();
        });

        let tour = { headline: "Na gosti na Pesho!", _id: 1 };
        let tours = [tour];

        it("Expect to get the correct tour by given id", done => {
            sinon.stub(Tour, "findOne", (query, cb) => {
                let _id = query._id;
                let foundTour = tours.find(t => t._id === _id);

                cb(null, foundTour);
            });

            data.getTourById(1).then(actualTour => {
                expect(actualTour.headline).to.eqls(tour.headline);
                done();
            });
        });

        it("Expect to reject with id if tour is not found", done => {
            sinon.stub(Tour, "findOne", (query, cb) => {
                let _id = query._id;
                let foundTour = tours.find(t => t._id === _id);
                cb(null, foundTour || null);
            });

            let providedId = 7;

            data.getTourById(providedId).catch(err => {
                expect(err).to.equals(providedId);
                done();
            });
        });

        it("Expect to reject with error if can not connect to database", done => {
            sinon.stub(Tour, "findOne", (query, cb) => {
                cb(errorMsg);
            });

            data.getTourById(5).catch(err => {
                expect(err).to.equals(errorMsg);
                done();
            });
        });
    });

    describe("getSearchResults()", () => {
        afterEach(() => {
            sinon.restore();
        });

        let tour1 = { headline: "Na gosti na Pesho!", _id: 1 };
        let tour2 = { headline: "Purgatory", _id: 2 };
        let tour3 = { headline: "Purgatory", _id: 3 };
        let tours = [tour1, tour2, tour3];

        it("Expect to return correct search results", done => {
            let result = JSON.parse(JSON.stringify(tours));
            sinon.stub(Tour, "find", (query, cb) => {
                for (var key in query) {
                    if (query.hasOwnProperty(key)) {
                        result = result.filter(t => t[key] === query[key]);
                    }
                }

                console.log(result);
                cb(null, result);
            });

            let search = { headline: "Purgatory" };

            data.getSearchResults(search).then(actualTours => {
                expect(actualTours.length).to.eql(2);
                done();
            });
        });

        it("Expect to reject with err if encounter error", done => {
            sinon.stub(Tour, "find", (query, cb) => {
                cb(errorMsg);
            });

            let search = { headline: "Stairway to Heaven" };

            data.getSearchResults(search).catch(err => {
                expect(err).to.equals(errorMsg);
                done();
            });
        });
    });
});