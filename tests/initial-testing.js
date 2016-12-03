/*globals require Promise describe it*/

const chai = require("chai");
const sinon = require("sinon");
let expect = chai.expect;

describe("Test environment", () => {
    it("Expect to pass", () => {
        expect(1).to.equal(1);
    });

    // it("Expect to fail", () => {
    //     expect(1).to.equal(2);
    // })

    describe("Test country data", () => {
        let Country = {
            find: () => { }
            //findOne: () => { }
        };
        describe("Test getAllCountries_()", () => {


            //require
            it("Expect to return 2 countries", done => {
                //arrange
                let countries = ["Bulgaria", "Austria"];
                sinon.stub(Country, 'find', (_, cb) => {
                    cb(null, countries);
                });

                //act
                let data = require("../server/data/country-data")({ models: { Country } });
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

        describe("Test getCountriesById()", () => {
            //let data=require("../server/data/tour-data")();

            //it("Expect to return 1 tour",()=>{

        });
    })
})