/*globals require Promise describe it*/

const chai = require("chai");
const sinon = require("sinon");
let expect = chai.expect;

describe("Test country data", () => {
    let Country = {
        find: () => { },
        findOne: () => { }
    };
    describe("Test getAllCountries_()", () => {
        it("Expect to return 2 countries", done => {
            //arrange
            let countries = ["Bulgaria", "Austria"];
            sinon.stub(Country, "find", (_, cb) => {
                cb(null, countries);
            });

            //act
            let data = require("../server/data/country-data")({Country});
            data.getAllCountries_()
                .then(actualCountries => {
                    //assert
                    console.log("assert");
                    expect(actualCountries).to.eql(countries);
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
})