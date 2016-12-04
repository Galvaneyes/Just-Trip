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

        save() {}
        static find() {}
    }

    let data = require("../../server/data/tour-data")({
        Tour
    });
});